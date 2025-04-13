import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push("/movie/" + search.trim());
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>IMDb Movie Lookup</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter IMDb ID (e.g. tt1234567)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Search
        </button>
      </form>
    </div>
  );
}