export const HOST = process.env.REACT_APP_HOST;

export const API = {
  auth: {
    signup: { uri: "/auth/sign_up", method: "POST", disableAuth: true },
    login: { uri: "/auth/login", method: "POST", disableAuth: true },
    getPlayer: { uri: "/auth/get_player", method: "GET" },
  },
};

export const STEP_INTERVAL = 20_000;

export enum STATUSES {
  success = "success",
  failure = "failure",
  token_expiration = "token_expiration",
  not_autorized = "not_autorized",
}
