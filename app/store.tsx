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
import stepReducer, { stepReducerPath } from "@/store/steps/slice";
import { createProjectApi } from "@/services/create-project/create-project-api";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [],
  blacklist: [createProjectApi.reducerPath, stepReducerPath],
};

const appReducer = combineReducers({
  [createProjectApi.reducerPath]: createProjectApi.reducer,
  [stepReducerPath]: stepReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);
const middlewares = [createProjectApi.middleware];

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
