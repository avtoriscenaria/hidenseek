import io from "socket.io-client";

import { HOST, STEP_INTERVAL } from "constants/api";
import { movePlayer, playerConnect, startGame } from "./index";
import { Game, GamePlayer } from "common/interfaces/Game";

let socket: any;

export const initiateSocket = (
  setConnected: (value: boolean) => void,
  token?: string,
  room?: string,
  player_id?: string
) => {
  if (token && room && player_id) {
    console.log("CONNECTION...");
    socket = io(HOST, {
      query: { token, room, player_id },
    });
    console.log(`Connecting socket...`);
    if (socket && room) {
      console.log(`Connected!`);
      setConnected(true);
      startTimer();
    }
  }
};
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) {
    socket.disconnect();
  }
};

export const onStartGameEmit = () => {
  if (socket) {
    console.log("onStartGameEmit");
    socket.emit("start_game");
  }
};

export const onStartGame = (
  setGame: (game: Game) => void,
  history: any,
  game?: Game
) => {
  if (socket) {
    socket.once("start_game", () => startGame(setGame, history, game));
  }
};

export const movePlayerSocket = (
  type: string,
  coordinates: { x: number; y: number }
) => {
  if (socket) {
    console.log("MOVE PLAYER");
    socket.emit("move", { coordinates });
  }
};

export const onMovePlayerSocket = (
  setGame: (game: Game) => void,
  game?: Game
) => {
  if (socket) {
    socket.once(
      "move",
      (payload: {
        players: GamePlayer[];
        // player_id: string;
        // coordinates: { x: number; y: number };
      }) => {
        console.log("OTHER MOVE", payload);
        movePlayer(payload, setGame, game);
      }
    );
  }
};

export const onNewPlayerConnect = (
  setGame: (game: Game) => void,
  game?: Game
) => {
  if (socket) {
    socket.once("player_connect", (gamePlayer: GamePlayer) =>
      playerConnect(gamePlayer, setGame, game)
    );
  }
};

export const startTimer = () => {
  if (socket) {
    console.log("run_timer");
    socket.emit("run_timer", STEP_INTERVAL);
  }
};

export const subscribeOnTimer = (
  setGame: (game: Game) => void,
  setTimer: (time: number) => void,
  game?: Game
) => {
  if (socket) {
    socket.once("timer", (payload: { time: number; hide: boolean }) => {
      console.log(payload);
      setTimer(payload.time);
      if (game !== undefined) {
        setGame({ ...game, hide: payload.hide });
      }
    });
  }
};

export const onLogout = (logoutCB: () => void) => {
  if (socket) {
    socket.once("logout", () => {
      console.log("LOGOUT");
      logoutCB();
    });
  }
};

// socket.on("start_game", () => startGame(setGame, history, game));
// socket.on(
//   "move",
//   (payload: { player_id: string; coordinates: { x: number; y: number } }) =>
//     movePlayer(payload, setGame, game)
// );
// socket.on("disconnect", () => console.log("DISCONECTED"));
