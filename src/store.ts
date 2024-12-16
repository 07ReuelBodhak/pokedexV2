import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./features/state";

export const store = configureStore({
  reducer: {
    navbar: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
