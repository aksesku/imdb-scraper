import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MoviePage() {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (id) {
      axios.get(`/api/movie?id=${id}`).then(res => setMovie(res.data))
    }
  }, [id])

  if (!movie) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-sm text-gray-400 mb-4">{movie.year} - {movie.genre} - {movie.rating}</p>
      <img src={movie.poster} alt={movie.title} className="w-60 mb-4 rounded" />
      <p className="mb-6">{movie.plot}</p>
      <a
        href={movie.downloadUrl}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download
      </a>
    </div>
  )
}