import React, { useState, useEffect } from "react";
import "../assets/styles/home.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const API_KEY = "a7bea256d2ab47c79cb845f128392cd2";
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?category=health&country=us&pageSize=5&page=${page}&apiKey=${API_KEY}`
      );
      const data = await res.json();
      if (data.status === "ok") {
        setArticles((prev) => [...prev, ...data.articles]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  // Detect scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight && !loading) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Health News</h1>
      <div className="news-feed">
        {articles.map((a, idx) => (
          <div className="post-card" key={idx}>
            {a.urlToImage && (
              <img src={a.urlToImage} alt={a.title} className="post-image" />
            )}
            <div className="post-body">
              <h2>
                <a href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.title}
                </a>
              </h2>
              <p>{a.description}</p>
              <span className="post-meta">
                {new Date(a.publishedAt).toLocaleDateString()} | {a.source?.name}
              </span>
            </div>
          </div>
        ))}
        {loading && <p className="loading-text">Loading more news...</p>}
      </div>
    </div>
  );
}
