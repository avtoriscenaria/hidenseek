export const HOST = "http://192.168.0.105:3005";

export const API = {
  auth: {
    signup: { uri: "/auth/sign_up", method: "POST", disableAuth: true },
    login: { uri: "/auth/login", method: "POST", disableAuth: true },
    getPlayer: { uri: "/auth/get_player", method: "GET" },
  },
  game: {
    createtGame: { uri: "/game/create", method: "POST" },
    findGame: { uri: "/game/find", method: "POST" },
    getGame: { uri: "/game", method: "GET" },
  },
};

export const STEP_INTERVAL = 10_000;

export enum STATUSES {
  success = "success",
  failure = "failure",
  token_expiration = "token_expiration",
  not_autorized = "not_autorized",
}
