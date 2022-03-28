import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { HOST, STEP_INTERVAL } from "constants/api";
import { useDispatch } from "react-redux";
import { setGame } from "redux/reducers/game";
import { IGame } from "common/interfaces/Game";
import { setOption } from "redux/reducers/options";
import { useAppSelector } from "redux/hooks";
import { getGame } from "common/selectors";

const useSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<any>();
  //const currentGame = useAppSelector(getGame)


  useEffect(() => {
    return () => {
      if (socketRef.current !== undefined) {
        console.log("UNMOUNT");
        socketRef.current.disconnect();
      }
    };
  }, []);

  const connect = useCallback(
    (token: string, player_id: string, room?: string) => {
      if (token && player_id) {
        console.log("CONNECT @#", room)
        const socket = io(HOST, {
          query: {
            token,
            room: room ? room : '',
            player_id,
          },
          data: {
            room
          }
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

        socketRef.current = socket;
      }
    },
    [dispatch]
  );

  const connectToGame = useCallback((create: boolean, player_id: string, gameKey?: string) => {
    if (socketRef.current) {
      socketRef.current.emit("connect_to_game", { create, player_id, gameKey });
    }
  }, []);

  const setHunterRoleSocket = useCallback((selectedPlayer: string) => {
    if (socketRef.current) {
      socketRef.current.emit("hunter_role", { selectedPlayer });
    }
  }, []);

  const onStartGameEmit = useCallback(() => {
    if (socketRef.current) {
      console.log("onStartGameEmit");
      socketRef.current.emit("start_game", { timeStep: STEP_INTERVAL });
    }
  }, []);

  const endTurnSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit("end_turn", { timeStep: STEP_INTERVAL });
    }
  }, []);

  const movePlayerSocket = useCallback((coordinates) => {
    if (socketRef.current) {
      socketRef.current.emit("move", { coordinates });
    }
  }, []);

  return {
    connect,
    connectToGame,
    setHunterRoleSocket,
    onStartGameEmit,
    endTurnSocket,
    movePlayerSocket,
  };
};

export default useSocket;
