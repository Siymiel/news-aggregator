import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  fetchNewsAPI,
  fetchGuardianNews,
  fetchNYTNews,
} from "../../api/newsService";
import { ArticleInterface, NewsState } from "./types";

const initialState: NewsState = {
  articles: [],
  query: "",
  category: "business",
  selectedSources: ["all"],
  author: null,
  loading: false,
  error: null,
  date: "",
  manualCategory: false,
  manualAuthor: false,
  manualSource: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<ArticleInterface[]>) {
      state.articles = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload.toLowerCase();
      state.manualCategory = true;
    },
    setSelectedSources(state, action: PayloadAction<string[]>) {
      state.selectedSources = action.payload;
      state.manualSource = true;
    },
    setAuthor(state, action: PayloadAction<string | null>) {
      state.author = action.payload;
      state.manualAuthor = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const {
  setArticles,
  setQuery,
  setCategory,
  setSelectedSources,
  setAuthor,
  setLoading,
  setError,
  setDate,
} = newsSlice.actions;

export default newsSlice.reducer;

// Thunk function to fetch news
export const fetchNews =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (): AppThunk => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const state = getState();

    const category = state.news.manualCategory
      ? state.news.category
      : state.preferences.preferenceCategory || state.news.category;

    const author = state.news.manualAuthor
      ? state.news.author
      : state.preferences.preferenceAuthor || state.news.author;

    const selectedSources = state.news.manualSource
      ? state.news.selectedSources
      : state.preferences.selectedPreferenceSources ||
        state.news.selectedSources;

    const { date } = state.news;

    dispatch(setSelectedSources(selectedSources ? selectedSources : ["all"]));
    dispatch(setCategory(category));
    dispatch(setAuthor(author));

    dispatch(setArticles([]));

    const fetchSources = [
      {
        name: "NewsAPI",
        enabled: selectedSources.includes("NewsAPI"),
        fetch: () => fetchNewsAPI(state.news.query, category, author, date),
      },
      {
        name: "The Guardian",
        enabled: selectedSources.includes("The Guardian"),
        fetch: () =>
          fetchGuardianNews(state.news.query, category, author, date),
      },
      {
        name: "NY Times",
        enabled: selectedSources.includes("NY Times"),
        fetch: () => fetchNYTNews(state.news.query, category, author, date),
      },
      {
        name: "all",
        enabled: selectedSources.includes("all"),
        fetch: async () => {
          const results = await Promise.all([
            fetchNewsAPI(state.news.query, category, author, date),
            fetchGuardianNews(state.news.query, category, author, date),
            fetchNYTNews(state.news.query, category, author, date),
          ]);
          return results.flat();
        },
      },
    ];

    let hasArticles = false;

    const fetchPromises = fetchSources
      .filter((source) => source.enabled)
      .map(async (source) => {
        try {
          const articles = await source.fetch();
          console.log("🚀 ~ .map ~ articles:", articles);
          if (articles.error) {
            dispatch(setError(articles.error));
          } else if (articles.length > 0) {
            hasArticles = true;

            // filtering out invalid articles
            const validArticles = articles.filter(
              (article: ArticleInterface) =>
                article.title &&
                article.author &&
                article.source &&
                article.publishedAt
            );

            if (validArticles.length > 0) {
              dispatch(
                setArticles([...getState().news.articles, ...validArticles])
              );
            }
          }
        } catch (error) {
          console.error(`Error fetching news from ${source.name}:`, error);
        }
      });

    await Promise.allSettled(fetchPromises);

    if (!hasArticles) {
      dispatch(setError("No articles found. Try adjusting the filters."));
    }

    dispatch(setLoading(false));
  };
