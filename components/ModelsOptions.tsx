"use client"

import React, { useEffect, useState } from "react"

const ModelsOptions = () => {
  const [models, setModels] = useState<{ name: string }[]>([])

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("http://localhost:11434/api/tags")
        const data = await res.json()

        setModels(data.models || [])
      } catch (error) {
        console.error("Failed to fetch models:", error)
        setModels([])
      }
    }
    fetchModels()
  }, [])

  return (
    <div className="relative w-64">
      <select
        name="model"
        id="model"
        className="block w-full appearance-none bg-zinc-800 text-white rounded-md px-4 py-2 pr-10 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {models.map((model) => (
          <option
            key={model.name}
            value={model.name}
            className="bg-zinc-800 text-white"
          >
            {model.name}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}

export default ModelsOptions
