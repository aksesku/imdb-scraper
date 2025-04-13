import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">IMDb Movie Search</h1>
      <form action="/search" className="flex gap-2">
        <input
          name="query"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </div>
  )
}