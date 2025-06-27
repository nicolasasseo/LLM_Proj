import { auth } from "@/auth"
import Image from "next/image"

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

  return (
    <div className="min-h-screen flex flex-col max-w-screen-lg mx-auto">
      <div className="pt-8 pl-15">
        <h1 className="text-4xl font-bold">
          Welcome back, {session.user?.name}
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form className="w-3/5 mx-auto">
          <div className="flex items-center  bg-zinc-800 rounded-2xl px-6 py-4 min-h-[64px] max-h-[200px] overflow-y-auto">
            <textarea
              placeholder="Enter your message..."
              className="flex-1 bg-transparent text-white border-none outline-none resize-none placeholder:text-zinc-400 text-lg"
              rows={1}
              style={{ minHeight: 32, maxHeight: 120 }}
            />
            <button
              type="submit"
              className="ml-4 bg-white text-zinc-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition hover:bg-zinc-200"
              aria-label="Send"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
