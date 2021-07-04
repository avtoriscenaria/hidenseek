import { useState } from "react";

const useDataStorage = (initialState: Object = {}) => {
  const [state, setState] = useState(initialState);

  const updateState = (param: string, value: any) => {
    setState({ ...state, [param]: value });
  };

  return { state, updateState };
};

export default useDataStorage;
