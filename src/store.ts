import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/state";

export const store = configureStore({
  reducer: {
    App: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
