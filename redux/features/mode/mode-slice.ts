import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  mode: PaletteMode;
};

const initialState: initialStateType = {
  mode: "light",
} as initialStateType;

export const mode = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { switchMode } = mode.actions;
export default mode.reducer;
