"use client"

// Send Chat Button component

import React from "react"

/**
 * SendChatButton Component
 *
 * A reusable button for submitting chat messages. Displays a send icon by default,
 * and shows a loading spinner and disables itself when the loading prop is true.
 *
 * Props:
 * - disabled (boolean): Disables the button when true.
 * - ariaLabel (string, optional): Accessible label for the button.
 * - loading (boolean, optional): Shows a spinner and disables the button when true.
 *
 * Usage:
 * <SendChatButton disabled={isDisabled} loading={isLoading} ariaLabel="Send" />
 */

export default function SendChatButton({
  disabled,
  ariaLabel,
  loading = false,
}: {
  disabled: boolean
  ariaLabel?: string
  loading?: boolean
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="ml-4 bg-white text-zinc-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition hover:bg-zinc-200 disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed"
      aria-label={ariaLabel || "Send"}
    >
      {loading ? (
        (console.log("loading"),
        (
          <svg
            className="w-6 h-6 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ))
      ) : (
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
      )}
    </button>
  )
}
