import { ChangeEvent, useState } from "react";

const useInput = (name: string) => {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    inputProps: {
      value,
      onChange,
      name,
    },
  };
};

export default useInput;
