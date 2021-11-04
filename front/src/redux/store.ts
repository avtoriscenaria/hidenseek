import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./reducers/game";
import playerSlice from "./reducers/player";
import optionsSlice from "./reducers/options";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    player: playerSlice,
    options: optionsSlice,
  },
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
