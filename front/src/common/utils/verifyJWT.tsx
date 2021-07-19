import { API, HOST, STATUSES } from "constants/api";
import LSData from "constants/LSData";

const verifyJWT = async (callback: (result: boolean) => void = () => {}) => {
  const { uri, method } = API.app.varifyJWT;

  let Authorization: string;

  const authDataString = localStorage.getItem(LSData.authData);

  if (authDataString) {
    const { token } = JSON.parse(authDataString);

    Authorization = `Bearer ${token}`;

    const res = await fetch(`${HOST}${uri}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    }).then((res) => res.json());

    callback(res.status === STATUSES.success);
  } else {
    callback(false);
  }
};

export default verifyJWT;
