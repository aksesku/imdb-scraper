import cheerio from 'cheerio';
import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'IMDb ID is required' });

  try {
    const url = `https://www.imdb.com/title/${id}/`;
    const { data: html } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const $ = cheerio.load(html);

    const title = $('title').text().split(' - IMDb')[0];
    const poster = $('meta[property="og:image"]').attr('content');
    const rating = $('span[class*="AggregateRatingButton__RatingScore"]').first().text();
    const plot = $('span[data-testid="plot-xl"]').first().text();

    res.status(200).json({ title, poster, rating, plot });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch IMDb data' });
  }
}
