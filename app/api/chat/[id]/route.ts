import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await auth()
    if (!sessionUser?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 403 })
    }

    const { id } = await params

    const chat = await prisma.chatSession.findUnique({
      where: { id },
    })
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }
    if (chat.userId !== sessionUser.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.chatSession.delete({ where: { id } })
    return NextResponse.json(
      { message: "Chat deleted successfully" },
      { status: 200 }
    )
  } catch (err) {
    console.error("Delete chat error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
