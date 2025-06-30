/**
 * Chat Title Generation Utility
 *
 * This utility function generates descriptive titles for chat conversations
 * using the Ollama LLM service. It takes the first message of a conversation
 * and creates a concise, meaningful title for easy identification.
 *
 * Features:
 * - AI-powered title generation using Gemma 2B Instruct model
 * - Concise output (maximum 8 words)
 * - Integration with local Ollama service
 * - Automatic prompt engineering for optimal results
 *
 * Title Generation:
 * - Analyzes conversation content to create descriptive titles
 * - Ensures titles are short and meaningful
 * - Uses the same Ollama service as chat functionality
 * - Returns trimmed response for clean output
 *
 * Usage:
 * - Called when creating new chat sessions
 * - Uses first message to generate contextual title
 * - Helps users identify conversations in chat history
 * - Integrates with database for persistent storage
 */

/**
 * Generates a descriptive title for a chat conversation
 * @param message - The first message of the conversation to base the title on
 * @returns Promise<string> - Generated title (max 8 words)
 */
export async function generateChatTitle(message: string) {
  // Create prompt for title generation with specific constraints
  const prompt = `Generate a short and descriptive title (max 8 words) for the following conversation:\n\n${message}. Just return the title, no other text.`

  // Send request to local Ollama server for title generation
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma:2b-instruct", // Use same model as chat for consistency
      prompt, // Title generation prompt
      stream: false, // Disable streaming for simple response
    }),
  })

  // Parse response and return trimmed title
  const data = await res.json()
  return data.response?.trim()
}
