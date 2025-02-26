import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { fetchNews } from "./redux/features/newsSlice";
import NewsList from "./components/NewsList";
import SearchFilter from "./components/SearchFilter";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );
  // console.log("🚀 ~ articles:", articles)

  const query = useSelector((state: RootState) => state.news.query);
  const category = useSelector((state: RootState) => state.news.category);
  const selectedSources = useSelector(
    (state: RootState) => state.news.selectedSources
  );
  const author = useSelector((state: RootState) => state.news.author);
  // console.log("🚀 ~ App - author:", author)

  useEffect(() => {
    if (articles.length === 0 && !author) {
      dispatch(fetchNews());
    }
  }, [dispatch, query, category, author, selectedSources, articles]);

  // console.log("🚀 ~ author:", author)

  return (
    <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-black">News Aggregator</h1>
      <SearchFilter />

      <section>
        {error && <p className="text-red-600 text-lg">{error}</p>}
        {loading ? (
          <p className="text-blue-600 text-lg">Fetching news, please wait...</p>
        ) : (
          <NewsList articles={articles} />
        )}
      </section>
    </div>
  );
};

export default App;
