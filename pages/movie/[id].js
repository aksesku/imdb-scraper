import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(() => id ? \`/api/imdb?id=\${id}\` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{
      backgroundImage: \`url(\${data.poster})\`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "#fff",
      padding: "40px",
      textShadow: "1px 1px 5px #000"
    }}>
      <h1>{data.title}</h1>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Genre:</strong> {data.genre}</p>
      <p>{data.description}</p>
      <a href={data.downloadUrl} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-block",
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#ff0055",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none"
      }}>Download</a>
    </div>
  );
}