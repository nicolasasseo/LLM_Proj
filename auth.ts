/**
 * NextAuth Configuration
 *
 * This file configures NextAuth.js for user authentication in the LLM chat application.
 * It sets up GitHub OAuth as the primary authentication provider and integrates with
 * Prisma for user data persistence.
 *
 * Features:
 * - GitHub OAuth authentication for secure user login
 * - Prisma adapter for database integration
 * - Session management and user state handling
 *
 * Usage:
 * - Import auth functions in API routes and server components
 * - Use signIn/signOut for client-side authentication
 * - Access user session data via the auth() function
 */

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

// Configure NextAuth with GitHub provider and Prisma adapter
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GithubProvider], // Use GitHub OAuth for authentication
  adapter: PrismaAdapter(prisma), // Store user data in database via Prisma
})
