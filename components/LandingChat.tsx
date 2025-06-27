"use client"

import { useRef, useState } from "react"
import { sendMessage } from "@/lib/actions/send-message"

export default function ChatInput({
  action,
}: {
  action: (formData: FormData) => Promise<void>
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [chatId, setChatId] = useState<string | null>(null)

  return (
    <form
      action={async (formData) => {
        let sid = chatId
        if (!sid) {
          sid = crypto.randomUUID()
          setChatId(sid)
        }
        formData.set("chatId", sid)
        await action(formData)
        if (textareaRef.current) textareaRef.current.value = ""
      }}
      className="w-3/5 mx-auto"
    >
      <div className="flex items-end bg-zinc-800 rounded-2xl px-6 py-4 min-h-[64px] max-h-[200px] overflow-y-auto">
        <textarea
          ref={textareaRef}
          name="message"
          placeholder="Enter your message..."
          className="flex-1 bg-transparent text-white border-none outline-none resize-none placeholder:text-zinc-400 text-lg"
          rows={1}
          style={{ minHeight: 32, maxHeight: 120 }}
        />
        <button
          type="submit"
          className="ml-4 bg-white text-zinc-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition hover:bg-zinc-200"
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
      {chatId && <input type="hidden" name="chatId" value={chatId} />}
    </form>
  )
}
