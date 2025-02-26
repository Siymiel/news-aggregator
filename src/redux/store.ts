import { configureStore, ThunkAction, Action  } from "@reduxjs/toolkit";
import { newsReducer, preferencesReducer } from "./features";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";

const preferencesPersistConfig = {
    key: "root",
    storage,
    whitelist: ["preferences"],
  };

  const persistedPreferencesReducer = persistReducer(preferencesPersistConfig, preferencesReducer);

const store = configureStore({
  reducer: {
    news: newsReducer,
    preferences: persistedPreferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store, persistor };