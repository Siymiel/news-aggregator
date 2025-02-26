import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  fetchNewsAPI,
  fetchGuardianNews,
  fetchNYTNews,
} from "../../api/newsService";
import { AggregatedNewsArticle } from "../../types";

interface NewsState {
  articles: AggregatedNewsArticle[];
  query: string;
  category: string;
  selectedSources: string[];
  author: string | null;
  loading: boolean;
  error: string | null;
  date: string;
}

const initialState: NewsState = {
  articles: [],
  query: "",
  category: "business",
  selectedSources: ["NewsAPI", "The Guardian", "NY Times", "all"],
  author: null,
  loading: false,
  error: null,
  date: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<AggregatedNewsArticle[]>) {
      state.articles = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSelectedSources(state, action: PayloadAction<string[]>) {
      state.selectedSources = action.payload;
    },
    setAuthor(state, action: PayloadAction<string | null>) {
      state.author = action.payload;
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
  }
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
  (): AppThunk => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const { selectedSources, category, author } = getState().preferences;
    const { date } = getState().news;

    dispatch(setSelectedSources(selectedSources));
  dispatch(setCategory(category));
  dispatch(setAuthor(author));

    let newsData: AggregatedNewsArticle[] = [];

    const fetchWithErrorHandling = async (
      fetchFunction: () => Promise<AggregatedNewsArticle[]>,
      sourceName: string
    ) => {
      try {
        return await fetchFunction();
      } catch (error) {
        console.error(`Error fetching news from ${sourceName}:`, error);
        return [];
      }
    };

    try {
      if (
        selectedSources.includes("NewsAPI") ||
        selectedSources.includes("all")
      ) {
        newsData.push(
          ...(await fetchWithErrorHandling(
            () => fetchNewsAPI("", category, author, date),
            "NewsAPI"
          ))
        );
      }
      if (
        selectedSources.includes("The Guardian") ||
        selectedSources.includes("all")
      ) {
        newsData.push(
          ...(await fetchWithErrorHandling(
            () => fetchGuardianNews("", category, date),
            "The Guardian"
          ))
        );
      }
      if (
        selectedSources.includes("NY Times") ||
        selectedSources.includes("all")
      ) {
        newsData.push(
          ...(await fetchWithErrorHandling(
            () => fetchNYTNews("", category, author, date),
            "NY Times"
          ))
        );
      }

      console.log("🚀 ~ newsData:", newsData);
      dispatch(setArticles(newsData));
    } catch (error) {
      console.error("Unexpected error fetching news:", error);
      dispatch(setError("Failed to load news. Please try again later."));
    } finally {
      dispatch(setLoading(false));
    }
  };
