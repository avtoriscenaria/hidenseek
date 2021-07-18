import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import LSData from "constants/LSData";
import useApiRequest from "common/hooks/useApiRequest";

export const useSignUpRequest = () => {
  const history = useHistory();
  const { request } = useApiRequest(API.auth.signup, {
    onSuccess: (data) => {
      history.push(ROUTES.auth.base);
    },
    onFailure: () => {},
  });

  return {
    request,
  };
};
