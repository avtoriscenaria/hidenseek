import { HOST, API } from "constants/api";

import { IApiLoginRequest } from "../interfaces";

const apiLoginRequest = (data: IApiLoginRequest) => {
  const { method, uri } = API.auth.login;

  return fetch(`${HOST}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default apiLoginRequest;
