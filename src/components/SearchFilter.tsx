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
import { GearIcon } from '@radix-ui/react-icons'

const sources = ["NewsAPI", "The Guardian", "NY Times"];
const categories = [
  "Business",
  "Sports",
  "Technology",
  "Entertainment",
  "Health",
];

const SearchFilter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const query = useSelector((state: RootState) => state.news.query);
  const category = useSelector((state: RootState) => state.news.category);
  const author = useSelector((state: RootState) => state.news.author);
  const date = useSelector((state: RootState) => state.news.date);
  const [source, setSource] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    dispatch(setQuery(query));
    dispatch(setSelectedSources([source]));
    dispatch(setAuthor(author));
    dispatch(setDate(date));

    dispatch(fetchNews());
  };

  return (
    <div className="py-4">
      {/* Search Inputs */}
      <section className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Title"
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
          />
          <select
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="all">All Sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by Author"
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={author || ""}
            onChange={(e) => dispatch(setAuthor(e.target.value))}
          />
          <input
            type="date"
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
            value={date}
            onChange={(e) => dispatch(setDate(e.target.value))}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div>
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
      <div className="flex gap-2 overflow-x-auto border-b pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
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
    </div>
  );
};

export default SearchFilter;
