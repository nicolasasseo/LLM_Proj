/**
 * Home Page Component
 *
 * This is the main landing page of the LLM chat application. It serves as the entry point
 * and handles both authenticated and unauthenticated user states with different UI experiences.
 *
 * Features:
 * - Authentication-aware rendering based on user session
 * - Welcome screen for unauthenticated users with sign-in prompt
 * - Personalized dashboard for authenticated users
 * - Integration with the chat interface for AI conversations
 *
 * Authentication Flow:
 * - Checks for active user session using NextAuth
 * - Redirects unauthenticated users to sign-in flow
 * - Provides personalized experience for logged-in users
 *
 * Usage:
 * - Serves as the default route (/)
 * - Integrates with LandingChat component for AI interactions
 * - Uses server-side authentication for secure session handling
 */

"use server"
import { auth } from "@/auth"
import Image from "next/image"
import { sendMessage } from "@/lib/actions/send-message"
import LandingChat from "@/components/LandingChat"

/**
 * Home page component that handles authentication state and renders appropriate UI
 * @returns JSX element with either welcome screen or authenticated dashboard
 */
export default async function Home() {
  // Get current authentication session
  const session = await auth()

  // Render welcome screen for unauthenticated users
  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 mt-4">
        <h1 className="text-4xl font-bold">Welcome to LLM-Project</h1>
        <p className="text-lg">
          To leverage the power of open sources LLMs, please sign in.
        </p>
      </div>
    )
  }

  // Render authenticated user dashboard with chat interface
  return (
    <div className="min-h-screen flex flex-col max-w-screen-lg mx-auto">
      {/* Personalized welcome header */}
      <div className="pt-8 pl-15">
        <h1 className="text-4xl font-bold">
          Welcome back, {session.user?.name}
        </h1>
      </div>
      {/* Chat interface container */}
      <div className="flex-1 flex items-center justify-center">
        <LandingChat action={sendMessage} />
      </div>
    </div>
  )
}
