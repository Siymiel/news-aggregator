import React, { useState, useEffect } from "react";
import { fetchNewsAPI, fetchGuardianNews, fetchNYTNews } from "./api/newsService";
import NewsList from "./components/NewsList";
import SearchFilter from "./components/SearchFilter";
import { GuardianNewsArticle, NewsApiArticle, NYTNewsArticle } from "./api";

type AggregatedNewsArticle = NewsApiArticle | GuardianNewsArticle | NYTNewsArticle;

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("business");
  const [selectedSources, setSelectedSources] = useState<string[]>(["NewsAPI", "The Guardian", "NY Times"]); // Default: All sources
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, [selectedSources, category, query, author]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      let newsData: AggregatedNewsArticle[] = [];

      if (selectedSources.includes("NewsAPI")) { 
        newsData.push(...(await fetchNewsAPI(query, category, author)));
      }
      if (selectedSources.includes("The Guardian")) {
        newsData.push(...(await fetchGuardianNews(query, category, author)));
      }
      if (selectedSources.includes("NY Times")) {
        newsData.push(...(await fetchNYTNews(query, category, author)));
      }

      setArticles(newsData);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black">News Aggregator</h1>
      <SearchFilter
        onSearch={setQuery}
        onFilterCategory={setCategory}
        onFilterSource={(source: string) => setSelectedSources([source])}
        onSetAuthor={setAuthor}
      />

      {/* Show error message if an error occurs */}
      {error && <p className="text-red-600 text-lg">{error}</p>}

      {/* Show loading message while fetching data */}
      {loading ? (
        <p className="text-blue-600 text-lg">Fetching news, please wait...</p>
      ) : (
        <NewsList articles={articles} />
      )}
    </div>
  );
};

export default App;
