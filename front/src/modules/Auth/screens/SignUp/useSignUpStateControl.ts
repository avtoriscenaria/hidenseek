import { useHistory } from "react-router";
import { useState } from "react";

import { useInput, useTranslations, useApiRequest } from "common/hooks";
import messages from "constants/messages";
import ROUTES from "constants/routes";

import { apiSignUpRequest } from "../../requests";

const useSignUpStateControl = () => {
  const history = useHistory();
  const { auth: translations } = useTranslations();

  const { value: nickname, inputProps: nicknameInputProps } =
    useInput("nickname");
  const { value: password, inputProps: passwordInputProps } =
    useInput("password");
  const { inputProps: confirmPasswordInputProps } = useInput("confirmPassword");

  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] =
    useState(false);

  const { request, response, error, message } = useApiRequest(
    apiSignUpRequest,
    () => {
      history.push(ROUTES.auth.base);
    }
  );

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
      nicknameInputProps,
      passwordInputProps,
      confirmPasswordInputProps,
      isFocusedConfirmPassword,
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