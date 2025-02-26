import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSelectedSources,
  setAuthor,
} from "../redux/features/preferencesSlice";
import { RootState } from "../redux/store";
import { Cross2Icon } from '@radix-ui/react-icons'

const sources = ["NewsAPI", "The Guardian", "NY Times"];
const categories = ["Business", "Sports", "Technology", "Entertainment", "Health"];

interface Props {
  close: () => void;
}

const PreferencesDropdown: React.FC<Props> = ({ close }) => {
  const dispatch = useDispatch();
  const { selectedSources, category, author } = useSelector(
    (state: RootState) => state.news
  );

  const [authorInput, setAuthorInput] = useState(author || "");

  const handleSourceChange = (source: string) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];
    dispatch(setSelectedSources(updatedSources));
  };

  return (
    <div className="absolute right-30 mt-1 bg-white shadow-md border border-gray-100 rounded p-4 w-64">
     <div className="flex justify-between items-center border-b border-gray-400 mb-3 pb-1">
       <button onClick={close} className="absolute right-3 text-gray-600 hover:bg-red-300 rounded-full p-0.5 cursor-pointer">
        <Cross2Icon className="h-5 w-5 hover:text-gray-200" />
      </button>

      <h3 className="text-lg font-semibold">Preferences</h3>
     </div>

      {/* Source Selection */}
      <div className="mb-3">
        <label className="font-semibold">Sources:</label>
        {sources.map((source) => (
          <div key={source} className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={selectedSources.includes(source)}
              onChange={() => handleSourceChange(source)}
            />
            <label>{source}</label>
          </div>
        ))}
      </div>

      {/* Category Selection */}
      <div className="mb-3">
        <label className="font-semibold">Category:</label>
        <select
          className="border p-2 rounded w-full text-black mt-1"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Author Input */}
      <div>
        <label className="font-semibold">Author:</label>
        <input
          type="text"
          placeholder="Filter by Author"
          className="border p-2 rounded w-full text-black mt-1"
          value={authorInput}
          onChange={(e) => {
            setAuthorInput(e.target.value);
            dispatch(setAuthor(e.target.value));
          }}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={close}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
};

export default PreferencesDropdown;
