import { API, HOST, STATUSES } from "constants/api";
import { Game } from "common/interfaces/Game";
import LSData from "constants/LSData";

const getGame = async (
  game_id?: string,
  callback: (game?: Game) => void = () => {}
) => {
  const { uri, method } = API.game.getGame;

  let Authorization: string;

  const authDataString = localStorage.getItem(LSData.authData);

  if (authDataString) {
    const { token, nickname } = JSON.parse(authDataString);

    Authorization = `Bearer ${token}`;

    const res = await fetch(`${HOST}${uri}/${game_id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    }).then((res) => res.json());

    if (res.status === STATUSES.success) {
      callback(res.data.game);
    } else {
    }
  } else {
    callback();
  }
};

export default getGame;
