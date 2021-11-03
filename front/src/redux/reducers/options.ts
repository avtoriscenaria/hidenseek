import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOptionsState {
  options: {
    game_id: string;
    isAuthorized: boolean;
  };
}

const initialState: IOptionsState = {
  options: {
    game_id: "",
    isAuthorized: false,
  },
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setOption(state, option: PayloadAction<any>) {
      return { ...state, options: { ...state.options, ...option } };
    },
  },
});

export const { setOption } = optionsSlice.actions;
export default optionsSlice.reducer;
