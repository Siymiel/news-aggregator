import axios from "axios";
import { NewsApiArticle, GuardianNewsArticle, NYTNewsArticle } from "./types";

const NEWS_API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&pageSize=10`;
const GUARDIAN_API_URL = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&page-size=10`;
const NYT_API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_API_KEY}`;
  
const fetchNewsAPI = async (query = "", category = "", author = "") => {
  let url = NEWS_API_URL;
  
  if (query) url += `&q=${query}`;
  if (category) url += `&category=${category}`;
  if (author) url += `&author=${author}`;
  
  const response = await axios.get(url);
//   console.log("🚀 ~ fetchNewsAPI ~ response:", response)
  return response.data.articles.map((article: NewsApiArticle) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: "NewsAPI",
    category,
    author: article.author || "Unknown",
  }));
};

const fetchGuardianNews = async (query = "", category = "", author = "") => {
  let url = GUARDIAN_API_URL
  
  if (query) url += `&q=${query}`;
  if (category) url += `&section=${category}`;
  
  const response = await axios.get(url);
//   console.log("🚀 ~ fetchGuardianNews ~ response:", response)
  return response.data.response.results.map((article: GuardianNewsArticle) => ({
    title: article.webTitle,
    description: "No description available",
    url: article.webUrl,
    source: "The Guardian",
    category,
    author: author || "Unknown",
  }));
};

const fetchNYTNews = async (query = "", category = "", author = "") => {
  let url = NYT_API_URL
  
  if (query) url += `&q=${query}`;
  if (category) url += `&fq=news_desk:("${category}")`;
  if (author) url += `&fq=byline:("${author}")`;
  
  const response = await axios.get(url);
//   console.log("🚀 ~ fetchNYTNews ~ response:", response)
  return response.data.response.docs.map((article: NYTNewsArticle) => ({
    title: article.headline.main,
    description: article.snippet || "No description available",
    url: article.web_url,
    source: "NY Times",
    category,
    author: article.byline?.original || "Unknown",
  }));
};

export { fetchNewsAPI, fetchGuardianNews, fetchNYTNews };