export const HOST = "http://192.168.0.101:3005";

export const API = {
  app: {
    varifyJWT: { uri: "/app", method: "GET" },
  },
  auth: {
    signup: { uri: "/auth/sign_up", method: "POST", disableAuth: true },
    login: { uri: "/auth/login", method: "POST", disableAuth: true },
  },
  game: {
    createtGame: { uri: "/game/create", method: "POST" },
  },
};

export enum STATUSES {
  success = "success",
  failure = "failure",
  token_expiration = "token_expiration",
  not_autorized = "not_autorized",
}
