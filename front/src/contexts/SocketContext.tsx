import React, { createContext, useContext, useState, useEffect } from "react";

import { HOST } from "constants/api";
import { Game } from "common/interfaces/Game";
import localStorageHelper from "common/utils/localStorageHelper";
import getGame from "common/utils/getGame";
import LSData from "constants/LSData";

import { useAppLayoutContext } from "./AppLayoutContext";

const io = require("socket.io-client");

interface Socket {
  socket?: any;
  game?: Game;
  setGame: (game: Game) => void;
}

const defaultContext: Socket = {
  socket: { on: (message: string, action: () => void) => {} },
  setGame: () => {},
};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const { token } = localStorageHelper("get", LSData.authData) || {};
  const { logout, hasGame } = useAppLayoutContext();
  const [socket, setSocket] = useState(defaultContext.socket);
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    setSocket(io(HOST, { query: { token } }));
  }, []);

  useEffect(() => {
    if (Boolean(hasGame) && game === undefined) {
      getGame(hasGame, (responseGame) => {
        if (Boolean(responseGame)) {
          setGame(responseGame);
        }
      });
    }
  }, [hasGame]);

  socket.on("connect", () => console.log("SOCKET CONNECTED!..."));
  socket.on("logout", logout);
  socket.on("move", () => console.log("PLAYER MOVE"));

  return (
    <SocketContext.Provider
      value={{
        socket,
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
