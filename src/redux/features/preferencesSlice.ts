import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";

interface PreferencesState {
  selectedSources: string[];
  category: string;
  author: string | null;
}

const initialState: PreferencesState = {
  selectedSources: ["NewsAPI", "The Guardian", "NY Times"],
  category: "business",
  author: null,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setSelectedSources(state, action: PayloadAction<string[]>) {
      state.selectedSources = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setAuthor(state, action: PayloadAction<string | null>) {
      state.author = action.payload;
    }
  },
});

export const { setSelectedSources, setCategory, setAuthor } =
  preferencesSlice.actions;

const persistConfig = {
  key: "preferences",
  storage,
};

export default persistReducer(persistConfig, preferencesSlice.reducer);
