import { Game, GamePlayer } from "common/interfaces/Game";
import { GAME_STATUSES } from "constants/gameConstants";
import ROUTES from "constants/routes";

export const playerConnect = (
  gamePlayer: GamePlayer,
  setGame: (game: Game) => void,
  game?: Game
) => {
  console.log("NEW PLAYER CONNECT", gamePlayer);
  if (
    game !== undefined &&
    !game.players.some((p) => p._id === gamePlayer._id)
  ) {
    console.log("SET GAME");
    setGame({ ...game, players: [...game.players, gamePlayer] });
  }
};

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

export const movePlayer = (
  payload: {
    player_id: string;
    coordinates: { x: number; y: number };
  },
  setGame: (game: Game) => void,
  game?: Game
) => {
  if (game !== undefined) {
    setGame({
      ...game,
      players: game?.players.map((p) =>
        p._id === payload.player_id
          ? { ...p, position: payload.coordinates }
          : p
      ),
    });
  }
};
