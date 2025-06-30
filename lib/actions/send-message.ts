"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { generateChatTitle } from "../generate-title"

/**
 * sendMessage Server Action
 *
 * This server action handles the process of sending a user message in the LLM chat application.
 * It authenticates the user, manages chat session creation, stores user and AI messages,
 * and communicates with the LLM backend API to generate AI responses.
 *
 * Features:
 * - Authenticates the user session
 * - Creates a new chat session if one does not exist
 * - Stores user messages in the database
 * - Calls the LLM API to generate AI responses
 * - Stores AI responses as messages in the chat session
 * - Handles errors and invalid states gracefully
 *
 * Usage:
 * - Used as a server action, triggered by a form submission
 * - Expects a FormData object with 'message' and 'chatId' fields
 * - Throws errors for unauthenticated users or invalid input
 */

export async function sendMessage(formData: FormData) {
  // Authenticate the current user session
  const sessionUser = await auth()
  if (!sessionUser) {
    throw new Error("Not logged in.")
  }

  // Extract message content and chat session ID from form data
  const content = formData.get("message") as string
  let chatId = formData.get("chatId") as string
  let model = formData.get("model") as string
  if (!chatId) throw new Error("No chatId provided")

  // Check if a chat session with this ID already exists
  let session = await prisma.chatSession.findUnique({ where: { id: chatId } })

  if (!session) {
    // Create a new chat session if it doesn't exist
    session = await prisma.chatSession.create({
      data: {
        id: chatId,
        title: await generateChatTitle(content), // Generate a title for the new chat
        user: { connect: { id: sessionUser.user?.id! } },
      },
    })
  }

  // Store the user's message in the database
  await prisma.message.create({
    data: {
      content,
      user: { connect: { id: sessionUser.user?.id! } },
      chatSession: { connect: { id: chatId } },
    },
  })

  // Call the LLM backend API to generate an AI response
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
    method: "POST",
    body: JSON.stringify({ prompt: content, model }),
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) {
    const text = await res.text()
    console.error("LLM API error:", text)
    throw new Error(`LLM API error: ${res.status}`)
  }

  let output: string = ""
  try {
    // Parse the AI response from the LLM API
    const json = await res.json()
    output = json.output
  } catch (e) {
    console.error("Failed to parse JSON from /api/chat:", await res.text())
    throw new Error("Invalid JSON response from LLM API")
  }

  // Store the AI's response as a message in the chat session
  await prisma.message.create({
    data: {
      content: output,
      chatSession: { connect: { id: chatId } },
      // No `user` field → this marks it as AI
    },
  })
}
