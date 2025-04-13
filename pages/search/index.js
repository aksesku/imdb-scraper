import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function SearchPage() {
  const router = useRouter()
  const { query } = router.query
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      setLoading(true)
      axios.get(`/api/search?query=${query}`)
        .then(res => setResults(res.data.results))
        .finally(() => setLoading(false))
    }
  }, [query])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {results.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              <img src={movie.image} alt={movie.title} className="w-full h-auto rounded mb-2" />
              <h2 className="text-sm font-semibold">{movie.title}</h2>
              <p className="text-xs text-gray-400">{movie.year}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}