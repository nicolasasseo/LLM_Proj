/**
 * Root Layout Component
 *
 * This is the main layout component that wraps all pages in the LLM chat application.
 * It provides the basic HTML structure, global styles, fonts, and authentication context
 * for the entire application.
 *
 * Features:
 * - Configures Google Fonts (Geist Sans and Geist Mono) for consistent typography
 * - Sets up global CSS styles and Tailwind CSS
 * - Includes the navigation bar with authentication state
 * - Provides authentication session data to child components
 * - Defines metadata for SEO and browser display
 *
 * Usage:
 * - Automatically applied to all pages in the app directory
 * - Child components receive the session data and styling context
 * - The Navbar component displays user authentication status
 */

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { auth } from "@/auth"

// Configure Google Fonts for consistent typography across the app
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable for sans-serif font
  subsets: ["latin"], // Include Latin character subset
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS variable for monospace font
  subsets: ["latin"], // Include Latin character subset
})

// Define metadata for SEO and browser display
export const metadata: Metadata = {
  title: "LLM Chat App",
  description: "Use open source LLMs like Mistral to chat",
}

/**
 * Root layout component that provides the basic structure for all pages
 * @param children - React components to be rendered within the layout
 * @returns HTML structure with fonts, navbar, and authentication context
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get current authentication session for the user
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation bar with authentication state */}
        <Navbar session={session} />
        {/* Main content area */}
        {children}
      </body>
    </html>
  )
}
