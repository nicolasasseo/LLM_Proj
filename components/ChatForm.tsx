/**
 * Chat Form Component
 *
 * This component provides the message input interface for continuing existing chat
 * conversations. It allows users to send new messages in an ongoing conversation
 * and automatically refreshes the page to display the updated conversation.
 *
 * Features:
 * - Message input
 * - Form submission with onSubmit and handleSubmit for async actions
 * - Automatic page refresh after message submission
 * - Disabled state for empty messages
 * - Loading spinner and disabled state for send button while processing
 * - Consistent styling with landing chat component
 * - Real-time input validation
 *
 * State Management:
 * - Controls message input state
 * - Manages form submission and page refresh
 * - Handles textarea clearing after submission
 * - Manages loading state for send button
 *
 * User Experience:
 * - Seamless continuation of conversations
 * - Immediate feedback with page refresh
 * - Visual feedback for button and loading states
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
import SendChatButton from "./SendChatButton"
import ModelsOptions from "./ModelsOptions"

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
  // Loading state for send button
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.set("chatId", chatId)

    await sendMessage(formData)
    if (textareaRef.current) textareaRef.current.value = ""
    setMessage("")
    router.refresh()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mt-6">
      {/* Chat input container with dark theme */}
      <div className="flex items-end bg-zinc-800 rounded-2xl px-6 py-4 min-h-[64px] max-h-[200px] overflow-y-auto">
        {/* Auto-resizing textarea for message input */}
        <textarea
          ref={textareaRef}
          name="message"
          placeholder="Continue the conversation..."
          className="flex-1 bg-transparent text-white border-none outline-none resize-none placeholder:text-zinc-400 text-lg max-h-[160px] scrollbar-hide"
          rows={1}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto"
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
            }
          }}
        />

        <ModelsOptions />

        {/* Send button with disabled state */}
        <SendChatButton
          disabled={!message.trim()}
          ariaLabel="Send"
          loading={loading}
        />
      </div>

      {/* Hidden input for chat ID */}
      <input type="hidden" name="chatId" value={chatId} />
    </form>
  )
}
