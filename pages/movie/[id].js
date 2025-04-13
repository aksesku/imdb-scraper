import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MoviePage() {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/imdb?id=${id}`)
      .then(res => res.json())
      .then(setMovie)
  }, [id])

  if (!movie) return <p>Loading...</p>

  return (
    <div style={{ textAlign: 'center', background: '#111', color: '#eee', padding: '20px', fontFamily: 'sans-serif' }}>
      <img src={movie.poster} alt={movie.title} style={{ width: '300px', borderRadius: '10px' }} />
      <h1>{movie.title}</h1>
      <p>IMDb Rating: {movie.rating}/10</p>
      <p style={{ maxWidth: '600px', margin: '0 auto' }}>{movie.plot}</p>
      <a href="https://your-direct-link.mp4" target="_blank" rel="noreferrer"
        style={{ display: 'inline-block', marginTop: '20px', padding: '12px 24px', background: '#e50914', color: 'white', borderRadius: '30px', textDecoration: 'none' }}>
        Watch Now
      </a>
    </div>
  )
}
