/**
 * Chat Form Component
 *
 * This component provides the message input interface for continuing existing chat
 * conversations. It allows users to send new messages in an ongoing conversation
 * and automatically refreshes the page to display the updated conversation.
 *
 * Features:
 * - Message input
 * - Form submission with server actions
 * - Automatic page refresh after message submission
 * - Disabled state for empty messages
 * - Consistent styling with landing chat component
 * - Real-time input validation
 *
 * State Management:
 * - Controls message input state
 * - Manages form submission and page refresh
 * - Handles textarea clearing after submission
 *
 * User Experience:
 * - Seamless continuation of conversations
 * - Immediate feedback with page refresh
 * - Visual feedback for button states
 * - Responsive design with proper accessibility
 *
 * Usage:
 * - Used in individual chat pages for ongoing conversations
 * - Integrates with sendMessage server action
 * - Automatically refreshes to show new messages
 */

"use client"

import { useRef, useState } from "react"
import { sendMessage } from "@/lib/actions/send-message"
import { useRouter } from "next/navigation"

interface ChatFormProps {
  chatId: string // ID of the current chat session
}

/**
 * Chat form component for continuing conversations
 * @param chatId - Unique identifier for the chat session
 * @returns JSX element for the chat input interface
 */
export default function ChatForm({ chatId }: ChatFormProps) {
  // Reference to textarea for programmatic access
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  // State for controlled message input
  const [message, setMessage] = useState("")
  // Router for page refresh after submission
  const router = useRouter()

  return (
    <form
      action={async (formData) => {
        // Set chat ID in form data for server action
        formData.set("chatId", chatId)

        // Submit message to server
        await sendMessage(formData)

        // Clear input after submission
        if (textareaRef.current) textareaRef.current.value = ""
        setMessage("")

        // Refresh the page to show the new message
        router.refresh()
      }}
      className="w-full max-w-4xl mx-auto mt-6"
    >
      {/* Chat input container with dark theme */}
      <div className="flex items-end bg-zinc-800 rounded-2xl px-6 py-4 min-h-[64px] max-h-[200px] overflow-y-auto">
        {/* Auto-resizing textarea for message input */}
        <textarea
          ref={textareaRef}
          name="message"
          placeholder="Continue the conversation..."
          className="flex-1 bg-transparent text-white border-none outline-none resize-none placeholder:text-zinc-400 text-lg"
          rows={1}
          style={{ minHeight: 32, maxHeight: 120 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send button with disabled state */}
        <button
          type="submit"
          disabled={!message.trim()} // Disable when message is empty
          className="ml-4 bg-white text-zinc-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition hover:bg-zinc-200 disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          {/* Send icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Hidden input for chat ID */}
      <input type="hidden" name="chatId" value={chatId} />
    </form>
  )
}
