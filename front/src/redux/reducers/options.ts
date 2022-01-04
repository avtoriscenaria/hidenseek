import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOptionsState {
  game_id: string;
  isAuthorized: boolean;
  gameStatus: string;
  socket: any;
}

const initialState: IOptionsState = {
  game_id: "",
  isAuthorized: false,
  gameStatus: "",
  socket: null,
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
