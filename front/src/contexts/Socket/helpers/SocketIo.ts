import io from "socket.io-client";

import { HOST, STEP_INTERVAL } from "constants/api";
import { startGame } from "./index";
import { IGame } from "common/interfaces/Game";

let socket: any;

export const initiateSocket = (
  setConnected: (value: boolean) => void,
  token?: string,
  room?: string,
  player_id?: string
) => {
  if (token && room && player_id) {
    socket = io(HOST, {
      query: { token, room, player_id },
    });
    if (socket && room) {
      console.log(`Connected!`, room);
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

export const updateGameSocket = () => {
  if (socket) {
    socket.emit("get_game");
  }
};

// export const findGameSocket = (token: string, payload: {
//   gameKey?: string;
//   player_id?: string;
// }) => {
//   console.log("SOCKET", socket);
//   if (socket === undefined) {
//     socket = io(HOST, {
//       query: { token },
//     });
//     socket.emit("find_game", payload);
//   }
// };

export const onStartGameEmit = () => {
  if (socket) {
    console.log("onStartGameEmit");
    socket.emit("start_game", { timeStep: STEP_INTERVAL });
  }
};

export const updateGame = (updateGame: (game: IGame) => void) => {
  if (socket) {
    socket.once("update_game", ({ game }: { game: IGame }) => {
      updateGame(game);
    });
  }
};

export const onStartGame = (
  setGame: (game: IGame) => void,
  history: any,
  game?: IGame
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
    socket.emit("move", { coordinates });
  }
};

export const setHunterRoleSocket = (selectedPlayer: string) => {
  if (socket) {
    socket.emit("hunter_role", { selectedPlayer });
  }
};

export const endTurn = () => {
  if (socket) {
    socket.emit("end_turn", { timeStep: STEP_INTERVAL });
  }
};

export const startTimer = () => {
  if (socket) {
    socket.emit("run_timer", STEP_INTERVAL);
  }
};

export const subscribeOnTimer = (setTimer: (time: number) => void) => {
  if (socket) {
    socket.once(
      "timer",
      ({ time, startTime }: { time: number; startTime: number }) => {
        setTimer(time !== undefined ? time : startTime);
      }
    );
  }
};

export const logoutSocket = () => {
  if (socket) {
    socket.emit("logout");
    socket = undefined;
    console.log("SOCKET", socket);
  }
};
