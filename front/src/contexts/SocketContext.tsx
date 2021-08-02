import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

import { GAME_STATUSES } from "constants/gameConstants";
import { HOST } from "constants/api";
import { Game } from "common/interfaces/Game";
import localStorageHelper from "common/utils/localStorageHelper";
import getGame from "common/utils/getGame";
import LSData from "constants/LSData";

import { useAppLayoutContext } from "./AppLayoutContext";
import ROUTES from "constants/routes";

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
  const { logout, hasGame } = useAppLayoutContext();
  const [connect, setConnected] = useState(false);
  const [game, setGame] = useState<Game | undefined>();
  const [contextSocket, setContextSocket] = useState();

  useEffect(() => {
    if (connect) {
      console.log("CONNECT SOCKET GAME", hasGame);
      const socket = io(HOST, { query: { token, room: hasGame } });
      setContextSocket(socket);

      socket.on("connect", () => console.log("SOCKET CONNECTED!..."));
      socket.on("logout", logout);
      socket.on("move", () => console.log("PLAYER MOVE"));
      socket.on("disconnect", () => console.log("DISCONECTED"));

      return () => {
        console.log("UNMOUNT");

        socket.emit("disconnect", () => console.log("DISCONECTED"));
      };
    }
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
  }, [hasGame]);

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
