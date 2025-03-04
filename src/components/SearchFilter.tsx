import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  setQuery,
  setCategory,
  setSelectedSources,
  setAuthor,
  setDate,
} from "../redux/features/newsSlice";
import { fetchNews } from "../redux/features/newsSlice";
import PreferencesDropdown from "./PreferencesDropdown";
import { GearIcon } from "@radix-ui/react-icons";

const sources = ["all", "NewsAPI", "The Guardian", "NY Times"];
const categories = [
  "Business",
  "Sports",
  "Technology",
  "Entertainment",
  "Health",
];

const SearchFilter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { query, author, category, date, articles, selectedSources } = useSelector(
    (state: RootState) => state.news
  );
  const { preferenceCategory, preferenceAuthor, selectedPreferenceSources } =
    useSelector((state: RootState) => state.preferences);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClearFilters = () => {
    dispatch(setQuery(""));
    dispatch(setCategory(preferenceCategory || "business"));
    dispatch(setSelectedSources(selectedPreferenceSources || ["all"]));
    dispatch(setAuthor(preferenceAuthor || null));
    dispatch(setDate(""));

    dispatch(fetchNews());
  };

  return (
    <div className="py-4">
      {/* Search Inputs */}
      <section className="grid md:flex items-center justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex flex-col sm:flex-row gap-2 md:gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by Title"
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
          />
          <select
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={selectedPreferenceSources || selectedSources[0]}
            onChange={(e) => dispatch(setSelectedSources([e.target.value]))}
          >
            {sources.map((s) =>
              s === "all" ? (
                <option key={s} value={s}>
                  All Sources
                </option>
              ) : (
                <option key={s} value={s}>
                  {s}
                </option>
              )
            )}
          </select>
          <input
            type="text"
            placeholder="Filter by Author"
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={author || ""}
            onChange={(e) => dispatch(setAuthor(e.target.value))}
          />
          <input
            type="date"
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={date || ""}
            onChange={(e) => dispatch(setDate(e.target.value))}
          />

          <button
            onClick={handleClearFilters}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer
            "
          >
            Clear Filters
          </button>
        </div>

        <div className="hidden lg:block">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 cursor-pointer"
          >
            <span className="text-gray-700 text-xl">
              <GearIcon className="h-6 w-6 hover:text-black hover:shadow-md rounded-full" />
            </span>
          </button>

          {showDropdown && (
            <PreferencesDropdown close={() => setShowDropdown(false)} />
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="grid md:flex items-baseline justify-between border-b pb-6">
        <div className="flex gap-2 overflow-x-auto ">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded cursor-pointer ${
                category === cat.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                dispatch(setCategory(cat.toLowerCase()));
                dispatch(fetchNews());
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-base font-normal hidden md:grid">
          Showing: {articles.length > 0 ? articles.length : 0} results
        </p>
      </section>
    </div>
  );
};

export default SearchFilter;
