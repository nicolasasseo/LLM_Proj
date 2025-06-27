"use server"
import { auth } from "@/auth"
import Image from "next/image"
import { sendMessage } from "@/lib/actions/send-message"
import LandingChat from "@/components/LandingChat"

export default async function Home() {
  const session = await auth()
  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen  gap-4 mt-4">
        <h1 className="text-4xl font-bold">Welcome to LLM-Project</h1>
        <p className="text-lg">
          To leverage the power of open sources LLMs, please sign in.
        </p>
      </div>
    )
  }

  console.log(session)

  return (
    <div className="min-h-screen flex flex-col max-w-screen-lg mx-auto">
      <div className="pt-8 pl-15">
        <h1 className="text-4xl font-bold">
          Welcome back, {session.user?.name}
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <LandingChat action={sendMessage} />
      </div>
    </div>
  )
}
