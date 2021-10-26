import { HOST, API } from "constants/api";

const apiLoginRequest = (
  Authorization: string,
  data: { [key: string]: any }
) => {
  const { method, uri } = API.auth.login;

  return fetch(`${HOST}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: data && method === "POST" ? JSON.stringify(data) : undefined,
  });
};

export default apiLoginRequest;
