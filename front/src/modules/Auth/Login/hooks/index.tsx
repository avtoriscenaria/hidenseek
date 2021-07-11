import { API } from "../../../../constants/api";
import useApiRequest from "../../../../common/hooks/useApiRequest";

import { LoginData } from "../interfaces";

export const useLoginRequest = () => {
  const { request } = useApiRequest(API.auth.login, {
    onSuccess: () => {},
    onFailure: () => {},
  });

  return {
    request,
  };
};
