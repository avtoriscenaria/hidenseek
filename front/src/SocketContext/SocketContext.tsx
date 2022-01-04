import React, { createContext, useContext } from "react";
import useSocket from "./useSocket";
import MainLoader from "common/components/MainLoader";

import useVerifyJWT from "./useVerifyJWT";

interface ISocket {
  connect: (token: string, room: string, player_id: string) => void;
  setHunterRoleSocket: (selectedPlayer: string) => void;
  onStartGameEmit: () => void;
  endTurnSocket: () => void;
  movePlayerSocket: (coordinates: any) => void;
}

const defaultContext: ISocket = {
  connect: () => {},
  setHunterRoleSocket: () => {},
  onStartGameEmit: () => {},
  endTurnSocket: () => {},
  movePlayerSocket: () => {},
};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const {
    connect,
    setHunterRoleSocket,
    onStartGameEmit,
    endTurnSocket,
    movePlayerSocket,
  } = useSocket();
  const { isLoad } = useVerifyJWT(connect);

  console.log("RE_MOUNT");

  return (
    <SocketContext.Provider
      value={{
        connect,
        setHunterRoleSocket,
        onStartGameEmit,
        endTurnSocket,
        movePlayerSocket,
      }}
    >
      {isLoad ? children : <MainLoader />}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): ISocket => useContext(SocketContext);

export default SocketContext;
