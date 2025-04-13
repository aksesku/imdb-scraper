import axios from 'axios'
import cheerio from 'cheerio'
import LRU from 'lru-cache'

const cache = new LRU({ max: 100, ttl: 1000 * 60 * 60 }) // 1 jam

export default async function handler(req, res) {
  const { query } = req.query
  if (!query) return res.status(400).json({ error: 'Query is required' })

  const cached = cache.get(query)
  if (cached) return res.json({ results: cached })

  try {
    const url = `https://www.imdb.com/find?q=${encodeURIComponent(query)}&s=tt&ttype=ft`
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const results = []

    $('.findList .findResult').each((i, el) => {
      const title = $(el).find('.result_text').text().trim()
      const link = $(el).find('a').attr('href')
      const idMatch = link?.match(/\/title\/(tt\d+)/)
      const image = $(el).find('img').attr('src') || ''
      if (idMatch) {
        results.push({
          id: idMatch[1],
          title,
          image,
          year: title.match(/\((\d{4})\)/)?.[1] || ''
        })
      }
    })

    cache.set(query, results)
    res.json({ results })
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape search results' })
  }
}