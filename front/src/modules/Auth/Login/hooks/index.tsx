import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import LSData from "constants/LSData";
import messages from "constants/messages";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import useApiRequest from "common/hooks/useApiRequest";
import { useState } from "react";
import useTranslations from "common/hooks/useTranslations";

export const useLoginRequest = () => {
  const history = useHistory();
  const { auth: authTranslations } = useTranslations();
  const { setIsAuthorized, setPlayer, setHasGame } = useAppLayoutContext();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const { request } = useApiRequest(API.auth.login, {
    onSuccess: (data) => {
      const {
        player: { nickname, _id, admin, game_id },
        token,
      } = data;
      setPlayer({ nickname, _id, admin });
      setHasGame(game_id);
      const authData = JSON.stringify({ nickname, token });
      localStorage.setItem(LSData.authData, authData);
      setIsAuthorized(true);

      history.push(ROUTES.game.menu);
    },
    onFailure: (resMessage) => {
      if (resMessage === messages.invalid_nickname_or_password) {
        setError(true);
        setMessage(authTranslations.nickname_or_password_error);
      } else {
        setMessage(resMessage);
      }
    },
  });

  return {
    request,
    error,
    message,
  };
};
