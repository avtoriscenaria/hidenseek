import { HOST, API } from "constants/api";

import { IApiSignUpRequest } from "../interfaces";

const apiSignUpRequest = (data: IApiSignUpRequest) => {
  const { method, uri } = API.auth.signup;

  return fetch(`${HOST}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default apiSignUpRequest;
