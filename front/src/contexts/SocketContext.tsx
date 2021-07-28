import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

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
  setGame: () => {},
};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const { token } = localStorageHelper("get", LSData.authData) || {};
  const { logout, hasGame } = useAppLayoutContext();
  const [connect, setConnected] = useState(false);
  const [game, setGame] = useState<Game | undefined>();
  const [contextSocket, setContextSocket] = useState();

  useEffect(() => {
    if (connect) {
      console.log("CONNECT SOCKET GAME", hasGame);
      const socket = io(HOST, { query: { token } });
      setContextSocket(socket);

      socket.on("connect", (socket: any) =>
        console.log("SOCKET CONNECTED!...", socket)
      );
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
