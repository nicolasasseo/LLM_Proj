/**
 * Navigation Bar Component
 *
 * This component provides the main navigation interface for the LLM chat application.
 * It displays the application logo, navigation links, and authentication controls
 * based on the user's login status.
 *
 * Features:
 * - Responsive navigation bar with logo and menu items
 * - Dynamic authentication state display
 * - Sign in/out functionality with GitHub OAuth
 * - Navigation links to chats for authenticated users
 * - Clean, modern design with hover effects
 *
 * Authentication States:
 * - Unauthenticated: Shows sign-in button with GitHub icon
 * - Authenticated: Shows "Chats" link and sign-out button
 *
 * Usage:
 * - Included in the root layout for global navigation
 * - Receives session data from NextAuth
 * - Handles authentication actions via auth-actions
 */

import Link from "next/link"
import React from "react"
import { Session } from "next-auth"
import AuthenticateButton from "./AuthenticateButton"

interface NavbarProps {
  session: Session | null // Current user session from NextAuth
}

/**
 * Navigation bar component with authentication controls
 * @param session - Current user session state
 * @returns JSX element for the navigation interface
 */
const Navbar = ({ session }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        {/* Application logo and home link */}
        <Link href="/" className="flex items-center ">
          <span className="text-2xl font-bold text-gray-800">Logo</span>
        </Link>

        {/* Navigation controls and authentication */}
        <div className="flex items-center space-x-4">
          {session ? (
            // Authenticated user interface
            <>
              {/* Link to user's chat history */}
              <Link href="/chats" className="text-slate-900 hover:text-sky-500">
                Chats
              </Link>
              {/* Sign out button via AuthenticateButton */}
              <AuthenticateButton loggedIn={true} image={session.user?.image} />
            </>
          ) : (
            // Unauthenticated user interface
            <>
              {/* Sign in button via AuthenticateButton */}
              <AuthenticateButton loggedIn={false} image={null} />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
