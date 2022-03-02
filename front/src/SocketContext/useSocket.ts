import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { HOST, STEP_INTERVAL } from "constants/api";
import { useDispatch } from "react-redux";
import { setGame } from "redux/reducers/game";
import { IGame } from "common/interfaces/Game";
import { setOption } from "redux/reducers/options";

const useSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<any>();

  useEffect(() => {
    return () => {
      if (socketRef.current !== undefined) {
        console.log("UNMOUNT");
        socketRef.current.disconnect();
      }
    };
  }, []);

  const connect = useCallback(
    (token: string, room: string, player_id: string) => {
      if (token && room && player_id) {
        console.log("GAME CONNECT");
        const socket = io(HOST, {
          query: {
            token,
            room,
            player_id,
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
            console.log("UPDATE TIMER");
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
    setHunterRoleSocket,
    onStartGameEmit,
    endTurnSocket,
    movePlayerSocket,
  };
};

export default useSocket;
