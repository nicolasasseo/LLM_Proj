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
        <p>No chats yet.</p>
      ) : (
        // List of chat sessions with navigation links
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link
                href={`/chats/${chat.id}`}
                className="block p-3 border rounded hover:bg-gray-100"
              >
                {chat.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
