"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persist, store } from "@/app/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      {children}
    </PersistGate>
  </Provider>
);
