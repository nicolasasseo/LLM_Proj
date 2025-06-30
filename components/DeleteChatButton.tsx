"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

interface DeleteChatButtonProps {
  chatId: string
}

export default function DeleteChatButton({ chatId }: DeleteChatButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this chat? This action cannot be undone."
      )
    )
      return
    setIsDeleting(true)
    const res = await fetch(`/api/chat/${chatId}`, { method: "DELETE" })
    if (res.ok) {
      router.push("/chats")
    }
    setIsDeleting(false)
  }

  return (
    <button
      onClick={handleDelete}
      className="ml-2 px-2 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-all duration-300 cursor-pointer"
      title="Delete chat"
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  )
}
