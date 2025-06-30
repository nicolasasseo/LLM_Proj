/**
 * Chats Listing Page
 *
 * This page displays a list of all chat sessions for the authenticated user.
 * It provides navigation to individual chat conversations and shows chat titles
 * in chronological order (most recent first).
 *
 * Features:
 * - Authentication-required access control
 * - Fetches user's chat sessions from database
 * - Displays chat titles with clickable links
 * - Handles empty state when no chats exist
 * - Responsive design with hover effects
 *
 * Database Integration:
 * - Queries ChatSession table filtered by user ID
 * - Orders results by last updated timestamp
 * - Uses Prisma ORM for type-safe database access
 *
 * Usage:
 * - Accessible at /chats route
 * - Requires user authentication
 * - Links to individual chat pages for conversation history
 */

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DeleteChatButton from "@/components/DeleteChatButton"

/**
 * Chats listing page component
 * @returns JSX element displaying user's chat sessions or authentication prompt
 */
export default async function ChatsPage() {
  // Get current user session for authentication check
  const sessionUser = await auth()

  // Show authentication prompt if user is not logged in
  if (!sessionUser?.user) return <p>Not logged in</p>

  // Fetch user's chat sessions from database, ordered by most recent
  const chats = await prisma.chatSession.findMany({
    where: { userId: sessionUser.user.id }, // Filter by current user
    orderBy: { updatedAt: "desc" }, // Most recent chats first
  })

  return (
    <div className="p-6">
      {/* Page header */}
      <h1 className="text-xl font-bold mb-4">Your Chats</h1>

      {/* Conditional rendering based on chat availability */}
      {chats.length === 0 ? (
        // Empty state when user has no chats
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-2xl font-bold">No chats yet.</h2>
          <p className="text-gray-500">
            Start a new chat by clicking the button below.
          </p>
          <Link
            href="/"
            className="text-blue-500 border-2 p-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            New Chat
          </Link>
        </div>
      ) : (
        // List of chat sessions with navigation links
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-zinc-700 rounded-md px-4 py-3 bg-gray-800 hover:ring-2 hover:ring-blue-700 transition-all duration-300"
            >
              {/* Chat title link (flex-grow on desktop) */}
              <Link
                href={`/chats/${chat.id}`}
                className="text-white text-lg truncate sm:flex-grow"
              >
                {chat.title}
              </Link>

              {/* Delete button (aligns right on desktop) */}
              <div className="sm:ml-4 sm:flex-shrink-0">
                <DeleteChatButton chatId={chat.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
