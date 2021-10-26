import useApiRequest from "common/useApiRequest";
import { ChangeEvent, useState } from "react";
import apiLoginRequest from "./apiLoginRequest";

const useLoginStateControl = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const { request, response, error, message } = useApiRequest(apiLoginRequest);

  const setValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "nickname") {
      setNickname(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const onLogin = async () => {
    request("", {});
  };

  return {
    state: { nickname, password },
    setValue,
    onLogin,
    response,
    error,
    message,
  };
};

export default useLoginStateControl;
