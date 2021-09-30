import { Game } from "common/interfaces/Game";
import { GAME_STATUSES } from "constants/gameConstants";
import ROUTES from "constants/routes";

export const startGame = (
  setGame: (game: Game) => void,
  history: any,
  game?: Game
) => {
  if (game !== undefined) {
    setGame({ ...game, status: GAME_STATUSES.in_process });
    history.push(ROUTES.game.base);
  }
};
