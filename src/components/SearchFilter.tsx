import React, { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  onFilterCategory: (category: string) => void;
  onFilterSource: (source: string) => void;
  onSetAuthor: (author: string) => void;
}

const sources = ["NewsAPI", "The Guardian", "NY Times"];
const categories = [
  "Business",
  "Sports",
  "Technology",
  "Entertainment",
  "Health",
];

const SearchFilter: React.FC<Props> = ({
  onSearch,
  onFilterCategory,
  onFilterSource,
  onSetAuthor,
}) => {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    onSearch(query);
    onFilterSource(source);
    onSetAuthor(author);
  };

  return (
    <div className="p-4">
      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Title"
          className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded w-full sm:w-auto text-black"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">All Sources</option>
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
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              onFilterCategory(category.toLowerCase());
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
