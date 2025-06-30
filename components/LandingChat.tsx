"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import SendChatButton from "./SendChatButton"

/**
 * Chat Input Component
 *
 * This component provides the chat input form for sending messages in the LLM chat application.
 * It manages the creation of a new chat session (if one does not exist), handles message input,
 * and redirects the user to the appropriate chat page upon sending a message.
 *
 * Features:
 * - Manages chat session ID creation and persistence
 * - Handles message input and form submission with onSubmit and handleSubmit
 * - Integrates with the sendMessage action for backend communication
 * - Loading spinner and disabled state for send button while processing
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
  // Loading state for send button
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    let sid = chatId
    if (!sid) {
      sid = crypto.randomUUID()
      setChatId(sid)
    }
    const formData = new FormData(e.currentTarget)
    formData.set("chatId", sid)
    await action(formData)
    if (textareaRef.current) textareaRef.current.value = ""
    setMessage("")
    router.push(`/chats/${sid}`)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-3/5 mx-auto">
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
        <SendChatButton disabled={!message.trim()} loading={loading} />
      </div>
      {/* Hidden input to persist chatId in the form if it exists */}
      {chatId && <input type="hidden" name="chatId" value={chatId} />}
    </form>
  )
}
