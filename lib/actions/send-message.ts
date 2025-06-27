"use server"

import { auth } from "@/auth"

export async function sendMessage(formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }
  const message = formData.get("message")
  console.log(message)
  return { success: true }
}
