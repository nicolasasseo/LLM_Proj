/**
 * Individual Chat Page
 *
 * This page displays a specific chat conversation with its complete message history.
 * It shows all messages in chronological order and provides a chat form for
 * continuing the conversation.
 *
 * Features:
 * - Dynamic routing based on chat ID parameter (params must be awaited in Next.js dynamic routes)
 * - Authentication and authorization checks
 * - Complete message history display
 * - Real-time chat form for new messages
 * - User-friendly message formatting with timestamps
 *
 * Security:
 * - Verifies user owns the chat session
 * - Returns 404 for unauthorized access
 * - Requires authentication to view chats
 *
 * Database Integration:
 * - Fetches chat session with related messages
 * - Includes user information for message attribution
 * - Orders messages chronologically
 *
 * Usage:
 * - Accessible at /chats/[id] route
 * - Displays conversation history and allows new messages
 * - Integrates with ChatForm component for message input
 *
 * Note:
 *   In Next.js app directory, dynamic route params must be awaited before use.
 *   See: https://nextjs.org/docs/messages/sync-dynamic-apis
 */

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ChatForm from "@/components/ChatForm"
import DeleteChatButton from "@/components/DeleteChatButton"

interface ChatPageProps {
  params: { id: string } // Chat ID from URL parameter
}

/**
 * Individual chat page component
 * @param params - Object containing the chat ID from the URL (must be awaited in dynamic routes)
 * @returns JSX element displaying chat conversation or error state
 */
export default async function ChatPage({ params }: ChatPageProps) {
  // Get current user session for authentication check
  const sessionUser = await auth()
  const { id } = await params

  // Show authentication prompt if user is not logged in
  if (!sessionUser?.user) return <p>Not logged in</p>

  // Fetch chat session with all related messages and user information
  const chat = await prisma.chatSession.findUnique({
    where: { id }, // Find chat by ID from URL
    include: {
      messages: {
        orderBy: { createdAt: "asc" }, // Messages in chronological order
        include: { user: true }, // Include user data for message attribution
      },
    },
  })

  // Return 404 if chat doesn't exist or user doesn't own it
  if (!chat || chat.userId !== sessionUser.user.id) return notFound()

  return (
    <div className="p-6">
      {/* Chat title header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-4">{chat.title}</h1>
        <DeleteChatButton chatId={chat.id} />
      </div>
      {/* Message history container */}
      <div className="space-y-4">
        {chat.messages.map((msg) => (
          <div key={msg.id} className="p-2 border rounded">
            {/* Message metadata with user and timestamp */}
            <p className="text-sm text-gray-500">
              {msg.user ? (
                // User message - show "You" and timestamp
                <>You, at {new Date(msg.createdAt).toLocaleTimeString()}</>
              ) : (
                // AI message - show "Answer from AI" and timestamp
                <>
                  Answer from AI at{" "}
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </>
              )}
            </p>
            {/* Message content */}
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Chat form for new messages */}
      <ChatForm chatId={id} />
    </div>
  )
}
