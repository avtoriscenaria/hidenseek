import { configureStore } from "@reduxjs/toolkit";
import { gameSlice, optionsSlice, playerSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    player: playerSlice,
    options: optionsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
