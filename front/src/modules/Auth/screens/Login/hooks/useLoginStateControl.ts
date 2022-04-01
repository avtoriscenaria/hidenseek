import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { setPlayer } from "redux/reducers/player";
import { setOption } from "redux/reducers/options";
import { useAppDispatch } from "redux/hooks";
import useInput from "hooks/useInput";
import LSData from "constants/LSData";
import useTranslations from "common/hooks/useTranslations";
import useApiRequest from "common/useApiRequest";
import messages from "constants/messages";
import ROUTES from "constants/routes";

import { apiLoginRequest } from "../../../api";

const useLoginStateControl = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { auth: translations } = useTranslations();
  const { value: nickname, inputProps: nicknameInputProps } =
    useInput("nickname");
  const { value: password, inputProps: passwordInputProps } =
    useInput("password");

  const { request, response, error, message } = useApiRequest(
    apiLoginRequest,
    useCallback(
      (data) => {
        const { player, token } = data;
        const { game_id, nickname } = player;
        dispatch(setPlayer(player));
        dispatch(setOption({ game_id }));

        const authData = JSON.stringify({ nickname, token });
        localStorage.setItem(LSData.authData, authData);
        dispatch(setOption({ isAuthorized: true }));

        history.push(ROUTES.game.base);
      },
      [dispatch, history]
    )
  );

  const onLogin = () => {
    request({ nickname, password });
  };

  const onSignUp = useCallback(() => {
    history.push(ROUTES.auth.signUp);
  }, [history]);

  return {
    state: { nicknameInputProps, passwordInputProps },
    actions: {
      onSignUp,
    },
    apiService: {
      onLogin,
      response,
      error,
      message:
        message === messages.invalid_nickname_or_password
          ? translations.nickname_or_password_error
          : message,
    },
    translations,
  };
};

export default useLoginStateControl;
