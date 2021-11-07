import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGameState {
  player: any;
}

const initialState: IGameState = {
  player: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer(state, { payload: player }: PayloadAction<any>) {
      return { ...state, player };
    },
  },
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
