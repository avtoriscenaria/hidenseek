import { useHistory } from "react-router";
import { ChangeEvent, useState } from "react";

import useInput from "hooks/useInput";
import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";
import useApiRequest from "common/useApiRequest";
import messages from "constants/messages";

import { apiSignUpRequest } from "../../../api";

const useSignUpStateControl = () => {
  const history = useHistory();
  const { auth: translations } = useTranslations();

  const { value: nickname, inputProps: nicknameInputProps } = useInput();
  const { value: password, inputProps: passwordInputProps } = useInput();
  const { inputProps: confirmPasswordInputProps } = useInput();

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
