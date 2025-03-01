import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";

interface PreferencesState {
  selectedPreferenceSources: string;
  preferenceCategory: string | null;
  preferenceAuthor: string | null;
}

const initialState: PreferencesState = {
  selectedPreferenceSources: "all",
  preferenceCategory: "",
  preferenceAuthor: "",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setSelectedPreferenceSources(state, action: PayloadAction<string>) {
      state.selectedPreferenceSources = action.payload;
    },
    setPreferenceCategory(state, action: PayloadAction<string | null>) {
      state.preferenceCategory = action.payload;
    },
    setPreferenceAuthor(state, action: PayloadAction<string | null>) {
      state.preferenceAuthor = action.payload;
    }
  },
});

export const { setSelectedPreferenceSources, setPreferenceCategory, setPreferenceAuthor } =
  preferencesSlice.actions;

const persistConfig = {
  key: "preferences",
  storage,
};

export default persistReducer(persistConfig, preferencesSlice.reducer);
