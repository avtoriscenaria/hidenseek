import { useHistory } from "react-router";
import { ChangeEvent, useState } from "react";

import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";
import useApiRequest from "common/useApiRequest";
import messages from "constants/messages";

import { apiSignUpRequest } from "../../../api";

const useSignUpStateControl = () => {
  const history = useHistory();
  const { auth: translations } = useTranslations();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] =
    useState(false);

  const { request, response, error, message } = useApiRequest(
    apiSignUpRequest,
    () => {
      history.push(ROUTES.auth.base);
    }
  );

  const setValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>) => {
    // TO DO
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const onLogin = () => {
    history.push(ROUTES.auth.base);
  };

  const onSignUp = async () => {
    request({ nickname, password });
  };

  const focusConfirmPassword = () => {
    setIsFocusedConfirmPassword(true);
  };

  return {
    state: {
      nickname,
      password,
      confirmPassword,
      isFocusedConfirmPassword,
      setValue,
    },
    actions: { onLogin, focusConfirmPassword },
    apiService: {
      onSignUp,
      response,
      error,
      message:
        message === messages.player_exist_warning
          ? translations.player_exist_warning
          : message,
    },
    translations,
  };
};

export default useSignUpStateControl;
