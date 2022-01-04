import { IGame } from "common/interfaces/Game";
import { GAME_STATUSES } from "constants/gameConstants";
import ROUTES from "constants/routes";

export const startGame = (
  setGame: (game: IGame) => void,
  history: any,
  game?: IGame
) => {
  if (game !== undefined) {
    setGame({ ...game, status: GAME_STATUSES.in_process });
    history.push(ROUTES.game.base);
  }
};
