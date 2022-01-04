import { ChangeEvent, useMemo, useCallback, useState, memo } from "react";
import { useHistory } from "react-router-dom";
import { setPlayer } from "redux/reducers/player";
import { setOption } from "redux/reducers/options";
import { useAppDispatch } from "redux/hooks";

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
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const apiLogin = useCallback(apiLoginRequest, []);

  const { request, response, error, message } = useApiRequest(
    apiLogin,
    useCallback(
      (data) => {
        const { player, token } = data;
        const { game_id, nickname } = player;
        dispatch(setPlayer(player));
        dispatch(setOption({ game_id }));

        const authData = JSON.stringify({ nickname, token });
        localStorage.setItem(LSData.authData, authData);
        dispatch(setOption({ isAuthorized: true }));

        history.push(ROUTES.game.menu);
      },
      [dispatch, history]
    )
  );
  const setValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (name === "nickname") {
      setNickname(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const onLogin = useCallback(async () => {
    console.log("LOGIN");
    request({ nickname, password });
  }, [nickname, password, request]);

  const onSignUp = () => {
    history.push(ROUTES.auth.signUp);
  };

  return {
    state: { nickname, password, setValue },
    actions: { onSignUp },
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
