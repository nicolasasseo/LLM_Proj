"use client"

import React, { useState } from "react"
import { login, logout } from "../lib/auth-actions"
import Image from "next/image"

interface AuthenticateButtonProps {
  loggedIn: boolean
  image: string | null | undefined
}

const AuthenticateButton = ({ loggedIn, image }: AuthenticateButtonProps) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    if (loggedIn) {
      await logout()
    } else {
      await login()
    }
    // The page will likely reload after auth, so no need to reset loading
  }

  if (loggedIn) {
    return (
      <button
        className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer disabled:opacity-60"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          "Signing out..."
        ) : (
          <>
            Sign Out
            {image && (
              <Image
                src={image}
                alt="GitHub"
                width={24}
                height={24}
                className="ml-2 rounded-full"
              />
            )}
          </>
        )}
      </button>
    )
  }
  return (
    <button
      className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer disabled:opacity-60"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        "Signing in..."
      ) : (
        <>
          Sign In
          {/* GitHub logo SVG icon */}
          <svg
            className="w-6 h-6 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </>
      )}
    </button>
  )
}

export default AuthenticateButton
