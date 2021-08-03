import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

import { GAME_STATUSES } from "constants/gameConstants";
import { HOST } from "constants/api";
import { Game, GamePlayer } from "common/interfaces/Game";
import localStorageHelper from "common/utils/localStorageHelper";
import getGame from "common/utils/getGame";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";

import { useAppLayoutContext } from "../AppLayoutContext";
import { playerConnect, startGame } from "./helpers";

const io = require("socket.io-client");

interface Socket {
  socket?: any;
  game?: Game;
  setGame: (game: Game) => void;
}

const defaultContext: Socket = {
  setGame: () => {},
};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { token } = localStorageHelper("get", LSData.authData) || {};
  const { logout, hasGame, player } = useAppLayoutContext();
  const [connect, setConnected] = useState(false);
  const [game, setGame] = useState<Game | undefined>();
  const [contextSocket, setContextSocket] = useState();

  useEffect(() => {
    if (connect) {
      const socket = io(HOST, {
        query: { token, room: hasGame, player: player?._id },
      });
      setContextSocket(socket);

      socket.on("connect", () => console.log("SOCKET CONNECTED!..."));
      socket.on("player_connect", (gamePlayer: GamePlayer) =>
        playerConnect(gamePlayer, setGame, game)
      );
      socket.on("logout", () => {
        console.log("LOGOUT");
        logout();
      });
      socket.on("start_game", () => startGame(setGame, history, game));
      socket.on("move", () => console.log("PLAYER MOVE"));
      socket.on("disconnect", () => console.log("DISCONECTED"));

      return () => {
        console.log("UNMOUNT");

        socket.emit("disconnect", () => console.log("DISCONECTED"));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  useEffect(() => {
    if (Boolean(hasGame) && game === undefined) {
      getGame(hasGame, (responseGame) => {
        if (Boolean(responseGame)) {
          setGame(responseGame);
          setConnected(true);
          const { status } = responseGame || {};

          if (status === GAME_STATUSES.start) {
            history.push(ROUTES.game.config);
          } else if (status === GAME_STATUSES.in_process) {
            history.push(ROUTES.game.base);
          }
        }
      });
    }
  }, [game, hasGame, history]);

  return (
    <SocketContext.Provider
      value={{
        socket: contextSocket,
        game,
        setGame,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): Socket => useContext(SocketContext);

export default SocketContext;
