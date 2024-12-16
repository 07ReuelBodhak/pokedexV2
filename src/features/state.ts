import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  option: string;
}

const initialState: NavState = {
  option: "home",
};

const navSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.option = action.payload;
    },
  },
});

export const { change } = navSlice.actions;
export default navSlice.reducer;
