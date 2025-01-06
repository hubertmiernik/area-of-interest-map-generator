import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "@/services/login-api/auth-api";
import authReducer, { authReducerPath } from "@/store/auth/slice";
import sidebarReducer, { sidebarReducerPath } from "@/store/sidebar/slice";
import eventReducer, { eventReducerPath } from "@/store/events/slice";

import { profileApi } from "@/services/profile-api/profile-api";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [authReducerPath],
  blacklist: [authApi.reducerPath, profileApi.reducerPath, sidebarReducerPath],
};

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [authReducerPath]: authReducer,
  [sidebarReducerPath]: sidebarReducer,
  [eventReducerPath]: eventReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);
const middlewares = [authApi.middleware, profileApi.middleware];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middlewares),
  // devTools: `${import.meta.env.NODE_ENV}` === "development",
});

setupListeners(store.dispatch);

export const persist = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
