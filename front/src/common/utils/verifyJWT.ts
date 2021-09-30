import { API, HOST, STATUSES } from "constants/api";
import LSData from "constants/LSData";
import Player from "common/interfaces/Player";

const verifyJWT = async (
  callback: (result?: {
    isVerified: boolean;
    player?: Player;
  }) => void = () => {}
) => {
  const { uri, method } = API.auth.getPlayer;

  let Authorization: string;

  const authDataString = localStorage.getItem(LSData.authData);

  if (authDataString) {
    const { token, nickname } = JSON.parse(authDataString);

    Authorization = `Bearer ${token}`;

    const res = await fetch(`${HOST}${uri}/${nickname}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));

    if (Boolean(res)) {
      callback({
        isVerified: res.status === STATUSES.success,
        player: res.data?.player,
      });
    }
  } else {
    callback();
  }
};

export default verifyJWT;
