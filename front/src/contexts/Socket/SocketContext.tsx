import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router";

import { GAME_STATUSES } from "constants/gameConstants";
import { HOST } from "constants/api";
import { Game, GamePlayer } from "common/interfaces/Game";
import localStorageHelper from "common/utils/localStorageHelper";
import getGameRequest from "common/utils/getGame";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";

import { useAppLayoutContext } from "../AppLayoutContext";
import { playerConnect, startGame, movePlayer } from "./helpers";

import {
  initiateSocket,
  disconnectSocket,
  onMovePlayerSocket,
  onNewPlayerConnect,
  onLogout,
} from "./helpers/SocketIo";

interface Socket {
  myGamePlayer?: GamePlayer;
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

  useEffect(() => {
    if (!connect) {
      initiateSocket(setConnected, token, hasGame, player?._id);
    }
  }, [connect, token, hasGame, player?._id, game]);

  useEffect(() => {
    onMovePlayerSocket(setGame, game);
    onNewPlayerConnect(setGame, game);
  }, [game]);

  useEffect(() => {
    onLogout(logout);
  }, [logout]);

  useEffect(() => {
    if (Boolean(hasGame) && game === undefined) {
      getGameRequest(hasGame, (responseGame) => {
        if (Boolean(responseGame)) {
          setGame(responseGame);
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

  const getMyGamePlayer = useCallback(() => {
    console.log("getMyGamePlayer");
    return game?.players.find((p) => p._id === player?._id);
  }, [game?.players, player?._id]);

  // useEffect(() => {
  //   if (connect) {
  //     const socket = io(HOST, {
  //       query: { token, room: hasGame, player: player?._id },
  //     });
  //     setContextSocket(socket);

  //     socket.on("connect", () => console.log("SOCKET CONNECTED!..."));
  //     socket.on("player_connect", (gamePlayer: GamePlayer) =>
  //       playerConnect(gamePlayer, setGame, game)
  //     );
  //     socket.on("logout", () => {
  //       console.log("LOGOUT");
  //       logout();
  //     });
  //     socket.on("start_game", () => startGame(setGame, history, game));
  //     socket.on(
  //       "move",
  //       (payload: {
  //         player_id: string;
  //         coordinates: { x: number; y: number };
  //       }) => movePlayer(payload, setGame, game)
  //     );
  //     socket.on("disconnect", () => console.log("DISCONECTED"));

  //     setConnected(false);

  //     return () => {
  //       console.log("UNMOUNT");

  //       socket.emit("disconnect", () => console.log("DISCONECTED"));
  //     };
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [connect, game]);

  return (
    <SocketContext.Provider
      value={{
        myGamePlayer: getMyGamePlayer(),
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
