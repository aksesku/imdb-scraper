import axios from 'axios'
import cheerio from 'cheerio'
import LRU from 'lru-cache'

const cache = new LRU({ max: 100, ttl: 1000 * 60 * 60 }) // 1 jam

export default async function handler(req, res) {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'ID is required' })

  const cached = cache.get(id)
  if (cached) return res.json(cached)

  try {
    const url = \`https://www.imdb.com/title/\${id}/\`
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const title = $('h1').first().text().trim()
    const plot = $('span[data-testid="plot-xl"]').text().trim()
    const poster = $('img.ipc-image').first().attr('src')
    const genre = $('a[href^="/search/title?genres="]').first().text().trim()
    const year = $('[data-testid="title-details-releasedate"]').text().match(/\d{4}/)?.[0] || ''
    const rating = $('[data-testid="hero-rating-bar__aggregate-rating__score"] span').first().text().trim()

    const movie = {
      id,
      title,
      plot,
      poster,
      genre,
      year,
      rating,
      downloadUrl: \`https://incredibleenhancementslightning.com/qqumqvsjc?key=2ae095dee8d04ef97af9cb410fbb38fe` // optional dummy direct link
    }

    cache.set(id, movie)
    res.json(movie)
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape movie data' })
  }
}
