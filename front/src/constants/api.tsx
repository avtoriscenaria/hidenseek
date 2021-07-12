export const HOST = "http://192.168.0.102:3005";

export const API = {
  auth: {
    signup: { uri: "/auth/sign_up", method: "POST" },
    login: { uri: "/auth/login", method: "POST" },
  },
  game: {
    getGame: { uri: "/game", method: "GET" },
  },
};

export enum STATUSES {
  success = "success",
  failure = "failure",
  token_expiration = "token_expiration",
  not_autorized = "not_autorized",
}
