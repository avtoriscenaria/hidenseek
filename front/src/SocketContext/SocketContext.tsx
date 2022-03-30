import React, { createContext, useContext } from "react";

import MainLoader from "common/components/MainLoader";

import useSocket from "./useSocket";
import useVerifyJWT from "./useVerifyJWT";
import { useAppSelector } from "redux/hooks";
import { getIsLoaded } from "common/selectors";

interface ISocket {
  connect: (token: string, room: string, player_id: string) => void;
  connectToGame: (create: boolean, player_id: string, gameKey?: string) => void;
  setHunterRoleSocket: (selectedPlayer: string) => void;
  onStartGameEmit: () => void;
  endTurnSocket: () => void;
  movePlayerSocket: (coordinates: any) => void;
  leaveGameSocket: () => void;
}

const defaultContext: ISocket = {
  connect: () => {},
  connectToGame: () => {},
  setHunterRoleSocket: () => {},
  onStartGameEmit: () => {},
  endTurnSocket: () => {},
  movePlayerSocket: () => {},
  leaveGameSocket: () => {},
};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const {
    connect,
    connectToGame,
    setHunterRoleSocket,
    onStartGameEmit,
    endTurnSocket,
    movePlayerSocket,
    leaveGameSocket,
  } = useSocket();

  const { isLoad } = useVerifyJWT(connect);
  const isLoaded = useAppSelector(getIsLoaded);

  console.log("RE_MOUNT", isLoaded);

  return (
    <SocketContext.Provider
      value={{
        connect,
        connectToGame,
        setHunterRoleSocket,
        onStartGameEmit,
        endTurnSocket,
        movePlayerSocket,
        leaveGameSocket,
      }}
    >
      {isLoaded || isLoad ? children : <MainLoader />}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): ISocket => useContext(SocketContext);

export default SocketContext;
