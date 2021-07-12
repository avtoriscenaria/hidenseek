import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import LSData from "constants/LSData";
import useApiRequest from "common/hooks/useApiRequest";

export const useLoginRequest = () => {
  const history = useHistory();
  const { request } = useApiRequest(API.auth.login, {
    onSuccess: (data) => {
      const {
        user: { nickname },
        token,
      } = data;
      const authData = JSON.stringify({ nickname, token });
      localStorage.setItem(LSData.authData, authData);

      history.push(ROUTES.game.base);
    },
    onFailure: () => {},
  });

  return {
    request,
  };
};
