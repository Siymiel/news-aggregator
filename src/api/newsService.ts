import axios from "axios";
import { NewsApiArticle, GuardianNewsArticle, NYTNewsArticle } from "./types";

const NEWS_API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&pageSize=10`;
const GUARDIAN_API_URL = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&page-size=10`;
const NYT_API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_API_KEY}`;
  
const fetchNewsAPI = async (query = "", category = "", author = "", date = "") => {
  try {
    let url = NEWS_API_URL;
    
    if (query) url += `&q=${query}`;
    if (category) url += `&category=${category}`;
    if (date) url += `&from=${date}&to=${date}`;
    
    const response = await axios.get(url);
    
    let articles = response.data.articles.map((article: NewsApiArticle) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: "NewsAPI",
      category,
      author: article.author !== null ? article.author : "Anonymous",
      publishedAt: article.publishedAt,
    }));

    if (author) {
      articles = articles.filter((article: { author: string; }) => 
        article.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    return articles;
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
};


const fetchGuardianNews = async (query = "", category = "", date = "") => {
  try {
    let url = GUARDIAN_API_URL;
    
    if (query) url += `&q=${query}`;
    if (category) url += `&section=${category}`;
    if (date) url += `&from-date=${date}&to-date=${date}`;
    
    const response = await axios.get(url);
    
    let articles = response.data.response.results.map((article: GuardianNewsArticle) => ({
      title: article.webTitle,
      description: "No description available",
      url: article.webUrl,
      source: "The Guardian",
      category,
      author: "Anonymous",
      publishedAt: article.webPublicationDate,
    }));

    return articles;
  } catch (error) {
    console.error("Error fetching from The Guardian:", error);
    return [];
  }
};


const fetchNYTNews = async (query = "", category = "", author = "", date = "") => {
  try {
    let url = NYT_API_URL;
    
    if (query) url += `&q=${query}`;
    if (category) url += `&fq=news_desk:("${category}")`;
    if (date) url += `&begin_date=${date.replace(/-/g, "")}&end_date=${date.replace(/-/g, "")}`;
    
    const response = await axios.get(url);
    
    let articles = response.data.response.docs.map((article: NYTNewsArticle) => ({
      title: article.headline.main,
      description: article.snippet || "No description available",
      url: article.web_url,
      source: "NY Times",
      category,
      author: article.byline?.original || "Anonymous",
      publishedAt: article.pub_date,
    }));

    if (author) {
      articles = articles.filter((article: { author: string; }) =>
        article.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    return articles;
  } catch (error) {
    console.error("Error fetching from NY Times:", error);
    return [];
  }
};


export { fetchNewsAPI, fetchGuardianNews, fetchNYTNews };