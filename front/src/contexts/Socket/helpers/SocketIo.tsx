import io from "socket.io-client";

import { HOST, STEP_INTERVAL } from "constants/api";
import { startGame } from "./index";
import { Game } from "common/interfaces/Game";

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
    socket.emit("start_game", { timeStep: STEP_INTERVAL });
  }
};

export const updateGame = (updateGame: (game: Game) => void) => {
  if (socket) {
    socket.once("update_game", ({ game }: { game: Game }) => {
      updateGame(game);
    });
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

export const onLogout = (logoutCB: () => void) => {
  if (socket) {
    socket.once("logout", () => {
      console.log("LOGOUT");
      logoutCB();
    });
  }
};
