"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function sendMessage(formData: FormData) {
  const sessionUser = await auth()
  if (!sessionUser) {
    throw new Error("Not logged in.")
  }

  const content = formData.get("message") as string
  let chatId = formData.get("chatId") as string
  if (!chatId) throw new Error("No chatId provided")

  // Check if session exists
  let session = await prisma.chatSession.findUnique({ where: { id: chatId } })

  if (!session) {
    // Create a new session with the provided sessionId
    session = await prisma.chatSession.create({
      data: {
        id: chatId,
        user: { connect: { id: sessionUser.user?.id! } },
      },
    })
  }

  // Create the message in the session
  await prisma.message.create({
    data: {
      content,
      user: { connect: { id: sessionUser.user?.id! } },
      chatSession: { connect: { id: chatId } },
    },
  })
}
