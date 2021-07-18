import React, { createContext, useContext } from "react";

import { HOST } from "constants/api";

const io = require("socket.io-client");

interface Socket {
  socket?: any;
}

const defaultContext: Socket = {};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const socket = io(HOST);

  socket.on("connect", () => console.log("SOCKET CONNECTED!..."));
  socket.on("move", () => console.log("PLAYER MOVE"));

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): Socket => useContext(SocketContext);

export default SocketContext;
