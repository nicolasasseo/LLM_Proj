"use client"

import React from "react"

interface DeleteChatButtonProps {
  chatId: string
}

export default function DeleteChatButton({ chatId }: DeleteChatButtonProps) {
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this chat? This action cannot be undone."
      )
    )
      return
    await fetch(`/api/chats/${chatId}`, { method: "DELETE" })
    window.location.reload()
  }

  return (
    <button
      onClick={handleDelete}
      className="ml-2 px-2 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-all duration-300"
      title="Delete chat"
    >
      Delete
    </button>
  )
}
