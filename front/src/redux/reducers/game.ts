import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGameState {
  game: any;
}

const initialState: IGameState = {
  game: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, { payload: game }: PayloadAction<any>) {
      return { ...state, game };
    },
  },
});

export const { setGame } = gameSlice.actions;
export default gameSlice.reducer;
