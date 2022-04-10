import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOptionsState {
  game_id: string;
  isAuthorized: boolean;
  isLoaded: boolean;
  gameStatus: string;
  timer?: number;
  timerUpdater?: number;
  message?: {
    text: string;
    type: string;
  };
}

const initialState: IOptionsState = {
  game_id: "",
  isAuthorized: false,
  isLoaded: false,
  gameStatus: "",
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setOption(state, { payload: option }: PayloadAction<any>) {
      return { ...state, ...option };
    },
  },
});

export const { setOption } = optionsSlice.actions;
export default optionsSlice.reducer;
