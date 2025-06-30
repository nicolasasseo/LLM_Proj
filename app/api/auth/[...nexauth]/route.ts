/**
 * NextAuth API Route Handler
 *
 * This file provides the API endpoints for NextAuth.js authentication.
 * It handles all authentication-related requests including sign-in, sign-out,
 * session management, and OAuth callbacks.
 *
 * Features:
 * - Handles GET and POST requests for authentication flows
 * - Manages OAuth callbacks from GitHub
 * - Processes session creation and validation
 * - Handles sign-out requests
 *
 * Usage:
 * - Automatically handles /api/auth/* routes
 * - Integrates with NextAuth.js configuration from auth.ts
 * - Provides secure authentication endpoints for the application
 */

import { handlers } from "@/auth"

// Export NextAuth handlers for GET and POST requests
export const { GET, POST } = handlers
