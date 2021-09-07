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
  onStartGame,
  onMovePlayerSocket,
  onNewPlayerConnect,
  onLogout,
  startTimer,
  subscribeOnTimer,
} from "./helpers/SocketIo";

interface Socket {
  myGamePlayer?: GamePlayer;
  game?: Game;
  timer?: number;
  isHideStep?: boolean;
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
  const [timer, setTimer] = useState<number | undefined>();

  useEffect(() => {
    if (!connect) {
      initiateSocket(setConnected, token, hasGame, player?._id);
    }
  }, [connect, token, hasGame, player?._id, game]);

  useEffect(() => {
    // subscribeOnTimer(setGame, setTimer, game);
    onMovePlayerSocket(setGame, game);
    onNewPlayerConnect(setGame, game);
  }, [game]);

  useEffect(() => {
    onStartGame(setGame, history, game);
  }, [game, history]);

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
    return game?.players.find((p) => p._id === player?._id);
  }, [game?.players, player?._id]);

  const getGameStep = useCallback(() => {
    return game?.hide;
  }, [game?.hide]);

  return (
    <SocketContext.Provider
      value={{
        myGamePlayer: getMyGamePlayer(),
        game,
        timer,
        isHideStep: getGameStep(),
        setGame,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): Socket => useContext(SocketContext);

export default SocketContext;
