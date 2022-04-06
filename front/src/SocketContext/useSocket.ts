import { useCallback, useEffect, useRef } from "react";
import io from "socket.io-client";

import { HOST, STEP_INTERVAL } from "constants/api";
import { useDispatch } from "react-redux";
import { setGame } from "redux/reducers/game";
import { IGame } from "common/interfaces/Game";
import { setOption } from "redux/reducers/options";
import localStorageHelper from "common/utils/localStorageHelper";
import { setPlayer } from "redux/reducers/player";

const useSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<any>();

  useEffect(() => {
    return () => {
      if (socketRef.current !== undefined) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const connect = useCallback(
    (token: string, player_id: string, room?: string) => {
      if (token && player_id) {
        const socket = io(HOST, {
          query: {
            token,
            room: room ? room : "",
            player_id,
          },
          data: {
            room,
          },
        });

        socket.on(
          "update_game",
          ({ game, isLoaded }: { game: IGame; isLoaded?: boolean }) => {
            dispatch(setGame(game));

            if (isLoaded) {
              dispatch(setOption({ isLoaded: true }));
            }
          }
        );

        socket.on(
          "timer",
          ({ time, startTime }: { time: number; startTime: number }) => {
            dispatch(
              setOption({ timer: time !== undefined ? time : startTime })
            );
          }
        );

        socket.on("leave_game", () => {
          dispatch(setGame(null));

          dispatch(
            setOption({
              game_id: "",
              gameStatus: "",
              timer: 0,
            })
          );
        });

        socket.on("logout", () => {
          dispatch(
            setOption({
              game_id: "",
              isAuthorized: false,
              isLoaded: false,
              gameStatus: "",
            })
          );
          dispatch(setGame(null));
          dispatch(setPlayer(null));
          localStorageHelper("remove", "authData");
        });

        socketRef.current = socket;
      }
    },
    [dispatch]
  );

  const connectToGame = useCallback(
    (create: boolean, player_id: string, gameKey?: string) => {
      if (socketRef.current) {
        socketRef.current.emit("connect_to_game", {
          create,
          player_id,
          gameKey,
        });
      }
    },
    []
  );

  const setHunterRoleSocket = useCallback(
    (selectedPlayer: string, game_id: string) => {
      if (socketRef.current) {
        socketRef.current.emit("hunter_role", { selectedPlayer, game_id });
      }
    },
    []
  );

  const onStartGameEmit = useCallback((game_id) => {
    if (socketRef.current) {
      socketRef.current.emit("start_game", {
        timeStep: STEP_INTERVAL,
        game_id,
      });
    }
  }, []);

  const endTurnSocket = useCallback((game_id) => {
    if (socketRef.current) {
      socketRef.current.emit("end_turn", { timeStep: STEP_INTERVAL, game_id });
    }
  }, []);

  const movePlayerSocket = useCallback((coordinates, game_id) => {
    if (socketRef.current) {
      socketRef.current.emit("move", { coordinates, game_id });
    }
  }, []);

  const leaveGameSocket = useCallback((game_id) => {
    if (socketRef.current) {
      socketRef.current.emit("leave", { game_id });
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  }, []);

  return {
    connect,
    connectToGame,
    setHunterRoleSocket,
    onStartGameEmit,
    endTurnSocket,
    movePlayerSocket,
    leaveGameSocket,
    disconnect,
  };
};

export default useSocket;
