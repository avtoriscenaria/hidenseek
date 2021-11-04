import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { setPlayer } from "redux/reducers/player";
import { setOption } from "redux/reducers/options";
import { useAppDispatch } from "redux/hooks";

import LSData from "constants/LSData";
import useTranslations from "common/hooks/useTranslations";
import useApiRequest from "common/useApiRequest";
import messages from "constants/messages";
import ROUTES from "constants/routes";

import apiLoginRequest from "../api/apiLoginRequest";

const useLoginStateControl = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { auth: translations } = useTranslations();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const { request, response, error, message } = useApiRequest(
    apiLoginRequest,
    (data) => {
      const { player, token } = data;
      const { game_id } = player;
      dispatch(setPlayer(player));
      dispatch(setOption({ game_id }));

      const authData = JSON.stringify({ nickname, token });
      localStorage.setItem(LSData.authData, authData);
      dispatch(setOption({ isAuthorized: true }));

      // history.push(ROUTES.game.menu);
    }
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

  const onLogin = async () => {
    request({ nickname, password });
  };

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
