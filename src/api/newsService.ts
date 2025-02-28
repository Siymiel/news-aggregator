import axios from "axios";
import { NewsApiArticle, GuardianNewsArticle, NYTNewsArticle } from "./types";
import { NEWS_API_URL, GUARDIAN_API_URL, NYT_API_URL } from "./constants";
import { ArticleInterface } from "@/redux/features/types";

// fetchNewsAPI
const fetchNewsAPI = async (
  query = "",
  category = "",
  author = "",
  date = ""
) => {
  try {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category) params.append("category", category);
    if (date) params.append("from", date);
    if (date) params.append("to", date);

    const url = `${NEWS_API_URL}?${params.toString()}`;

    const response = await axios.get(url);

    const articles = response.data.articles.map((article: NewsApiArticle) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: "NewsAPI",
      category,
      author: article.author !== null ? article.author : "Anonymous",
      publishedAt: article.publishedAt,
    }));

    return filterByAuthor(articles, author);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 429) {
          console.error("Rate limit exceeded. Please try again later.");
          return { error: "Too many requests. Please try again in a few minutes." };
        }
        return { error: `Failed to fetch news. Status: ${error.response.status}` };
      } else if (error.request) {
        return { error: "No response from the server. Please check your connection." };
      }
    }
    return { error: "An unexpected error occurred while fetching news." };
  }
};

// fetchGuardianNews
const fetchGuardianNews = async (
  query = "",
  category = "",
  author = "",
  date = ""
) => {
  try {
    let url = GUARDIAN_API_URL;

    if (query) url += `&q=${query}`;
    if (category) url += `&section=${category}`;
    if (date) url += `&from-date=${date}&to-date=${date}`;

    const response = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const articles = response.data.response.results.map(
      (article: GuardianNewsArticle) => ({
        title: article.webTitle,
        description: "No description available",
        url: article.webUrl,
        source: "The Guardian",
        category,
        author: "Anonymous",
        publishedAt: article.webPublicationDate,
      })
    );

    return filterByAuthor(articles, author);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 429) {
          console.error("Rate limit exceeded. Please try again later.");
          return { error: "Too many requests. Please try again in a few minutes." };
        }
        return { error: `Failed to fetch news. Status: ${error.response.status}` };
      } else if (error.request) {
        return { error: "No response from the server. Please check your connection." };
      }
    }
    return { error: "An unexpected error occurred while fetching news." };
  }
};

// fetchNYTNews
const fetchNYTNews = async (
  query = "",
  category = "",
  author = "",
  date = ""
) => {
  try {
    let url = NYT_API_URL;

    if (query) url += `&q=${query}`;
    if (category) url += `&fq=news_desk:("${category}")`;
    if (date)
      url += `&begin_date=${date.replace(/-/g, "")}&end_date=${date.replace(
        /-/g,
        ""
      )}`;

    const response = await axios.get(url);

    const articles = response.data.response.docs.map(
      (article: NYTNewsArticle) => ({
        title: article.headline.main,
        description: article.snippet || "No description available",
        url: article.web_url,
        source: "NY Times",
        category,
        author: article.byline?.original || "Anonymous",
        publishedAt: article.pub_date,
      })
    );

    return filterByAuthor(articles, author);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 429) {
          console.error("Rate limit exceeded. Please try again later.");
          return { error: "Too many requests. Please try again in a few minutes." };
        }
        return { error: `Failed to fetch news. Status: ${error.response.status}` };
      } else if (error.request) {
        return { error: "No response from the server. Please check your connection." };
      }
    }
    return { error: "An unexpected error occurred while fetching news." };
  }
};

const filterByAuthor = (articles: ArticleInterface[], author: string) => {
  if (!author) return articles;

  const formattedAuthor = author.toLowerCase().trim();

  return articles.filter((article) => {
    const articleAuthor = article.author.toLowerCase().trim();
    return formattedAuthor.split(" ").every((word) => articleAuthor.includes(word));
  });
};

export { fetchNewsAPI, fetchGuardianNews, fetchNYTNews };
