export default async function handler(req, res) {
  const { id } = req.query;
  const url = \`https://www.imdb.com/title/\${id}/\`;
  const response = await fetch(url);
  const html = await response.text();

  const title = html.match(/<title>(.*?)\s-\sIMDb<\/title>/)?.[1] ?? "Not found";
  const poster = html.match(/<meta property="og:image" content="(.*?)"/)?.[1];
  const description = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  const rating = html.match(/"ratingValue":"(.*?)"/)?.[1];
  const genre = html.match(/<a href="\/search\/title\?genres=.*?">(.*?)<\/a>/)?.[1];

  res.status(200).json({
    title,
    poster,
    description,
    rating,
    genre,
    id,
    downloadUrl: "https://incredibleenhancementslightning.com/qqumqvsjc?key=2ae095dee8d04ef97af9cb410fbb38fe" + id
  });
}
