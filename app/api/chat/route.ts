/**
 * Chat API Route Handler
 *
 * This API endpoint handles chat interactions with the Ollama LLM service.
 * It processes user prompts and returns AI-generated responses using the
 * Gemma 2B Instruct model running locally via Ollama.
 *
 * Features:
 * - POST endpoint for processing chat messages
 * - Integration with Ollama local LLM service
 * - Error handling for missing prompts and server errors
 * - JSON response formatting for frontend consumption
 *
 * Ollama Integration:
 * - Connects to local Ollama server on port 11434
 * - Uses Gemma 2B Instruct model for responses
 * - Disables streaming for simplified JSON parsing
 *
 * Usage:
 * - Send POST requests with JSON body containing 'prompt' field
 * - Returns JSON response with 'output' field containing AI response
 * - Handles errors gracefully with appropriate HTTP status codes
 */

import { NextResponse } from "next/server"

/**
 * POST handler for chat API endpoint
 * @param req - HTTP request object containing the user prompt
 * @returns JSON response with AI-generated output or error message
 */
export async function POST(req: Request) {
  try {
    // Parse request body to extract user prompt
    const body = await req.json()
    const prompt = body.prompt
    const model = body.model
    // Validate that prompt is provided
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }

    // Send request to local Ollama server for AI processing
    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model, // Use Gemma 2B Instruct model
        prompt, // User's input message
        stream: false, // Disable streaming for easier JSON parsing
      }),
    })

    // Parse Ollama response to extract AI output
    const parsed = await ollamaRes.json()

    // Return AI response to frontend
    return NextResponse.json({ output: parsed.response })
  } catch (err) {
    // Log error for debugging and return generic error message
    console.error("Chat API error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
