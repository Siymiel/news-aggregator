import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { newsReducer, preferencesReducer } from "./features";
import storage from "reduxjs-toolkit-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "reduxjs-toolkit-persist";

const preferencesPersistConfig = {
  key: "preferences",
  storage,
};

const persistedPreferencesReducer = persistReducer(
  preferencesPersistConfig,
  preferencesReducer
);

const store = configureStore({
  reducer: {
    news: newsReducer,
    preferences: persistedPreferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
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
