"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * Chat Input Component
 *
 * This component provides the chat input form for sending messages in the LLM chat application.
 * It manages the creation of a new chat session (if one does not exist), handles message input,
 * and redirects the user to the appropriate chat page upon sending a message.
 *
 * Features:
 * - Manages chat session ID creation and persistence
 * - Handles message input and form submission
 * - Integrates with the sendMessage action for backend communication
 * - Redirects to the chat page after sending a message
 * - Uses React hooks for state and ref management
 *
 * Usage:
 * - Used as the main input form on the landing page or chat page
 * - Receives an action prop for handling form submission
 * - Designed for use with Next.js and server actions
 */

export default function ChatInput({
  action,
}: {
  action: (formData: FormData) => Promise<void>
}) {
  // Ref to the textarea element for direct DOM manipulation (e.g., clearing input)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  // State to store the current chat session ID (null if not yet created)
  const [chatId, setChatId] = useState<string | null>(null)
  // State to store the current message input value
  const [message, setMessage] = useState("")
  // Next.js router for client-side navigation
  const router = useRouter()

  return (
    <form
      action={async (formData) => {
        // Use existing chatId or generate a new one if this is a new session
        let sid = chatId
        if (!sid) {
          sid = crypto.randomUUID() // Generate a unique chat session ID
          setChatId(sid)
        }
        // Attach chatId to the form data for backend processing
        formData.set("chatId", sid)
        // Call the provided action (e.g., sendMessage) to handle the message
        await action(formData)
        // Clear the textarea input after sending
        if (textareaRef.current) textareaRef.current.value = ""
        setMessage("")
        // Redirect to the chat page for this session
        router.push(`/chats/${sid}`)
      }}
      className="w-3/5 mx-auto"
    >
      <div className="flex items-end bg-zinc-800 rounded-2xl px-6 py-4 min-h-[64px] max-h-[200px] overflow-y-auto">
        <textarea
          ref={textareaRef} // Attach ref for direct DOM access
          name="message"
          placeholder="Enter your message..."
          className="flex-1 bg-transparent text-white border-none outline-none resize-none placeholder:text-zinc-400 text-lg"
          rows={1}
          style={{ minHeight: 32, maxHeight: 120 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message state on input
        />
        <button
          type="submit"
          disabled={!message.trim()} // Disable if message is empty
          className="ml-4 bg-white text-zinc-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition hover:bg-zinc-200 disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed"
          aria-label="Send"
        >
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
      {/* Hidden input to persist chatId in the form if it exists */}
      {chatId && <input type="hidden" name="chatId" value={chatId} />}
    </form>
  )
}
