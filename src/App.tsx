import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { fetchNews } from "./redux/features/newsSlice";
import NewsList from "./components/NewsList";
import SearchFilter from "./components/SearchFilter";
import { SymbolIcon } from "@radix-ui/react-icons";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  const query = useSelector((state: RootState) => state.news.query);
  const category = useSelector((state: RootState) => state.news.category);
  const selectedSources = useSelector(
    (state: RootState) => state.news.selectedSources
  );
  const author = useSelector((state: RootState) => state.news.author);

  const memoizedFilters = useMemo(() => ({ query, category, selectedSources, author }), [query, category, selectedSources, author]);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch, memoizedFilters]);
  
  return (
    <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-black">📰 News Aggregator</h1>
      <SearchFilter />

      <section>
        {/* {articles.length === 0 && !loading && !error && <p>No articles found.</p>} */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 mt-10 bg-gray-100 p-4 rounded-md">
            <SymbolIcon className="w-6 h-6 animate-spin" />
            <p className="text-blue-600 text-lg">Fetching news, please wait...</p>
          </div>
        ) : (
          <NewsList articles={articles} />
        )}
        {error && <p className="text-red-600 text-lg">{error}</p>}
      </section>
    </div>
  );
};

export default App;
