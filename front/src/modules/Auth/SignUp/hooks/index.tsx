import { useState } from "react";
import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import LSData from "constants/LSData";
import useApiRequest from "common/hooks/useApiRequest";
import messages from "constants/messages";
import useTranslations from "common/hooks/useTranslations";

export const useSignUpRequest = () => {
  const history = useHistory();
  const { auth } = useTranslations();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const { request } = useApiRequest(API.auth.signup, {
    onSuccess: (data) => {
      history.push(ROUTES.auth.base);
    },
    onFailure: (resMessage) => {
      if (resMessage === messages.player_exist_warning) {
        setError(true);
        setMessage(auth.player_exist_warning);
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
