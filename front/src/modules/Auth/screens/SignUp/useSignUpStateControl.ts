import { useHistory } from "react-router";
import { ChangeEvent, useState } from "react";

import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";

interface ISetValue {
  target: {
    value: boolean;
  };
}

const useSignUpStateControl = () => {
  const history = useHistory();
  const { auth: translations } = useTranslations();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] =
    useState(false);

  const setValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>) => {
    // TO DO
    console.log(name, value);
    //setIsFocusedConfirmPassword(value);
  };

  const onLogin = () => {
    history.push(ROUTES.auth.base);
  };

  const onSignUp = async () => {
    // const { nickname, password }: { nickname?: string; password?: string } =
    //   signUpData;

    // request({ nickname, password });
    console.log("onSignUp");
  };

  return {
    state: {
      nickname,
      password,
      confirmPassword,
      isFocusedConfirmPassword,
      setValue,
    },
    actions: { onLogin },
    apiService: {
      onSignUp,
      //   response,
      error: false,
      message: "",
    },
    translations,
  };
};

export default useSignUpStateControl;
