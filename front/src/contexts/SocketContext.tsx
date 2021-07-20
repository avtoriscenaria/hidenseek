import React, { createContext, useContext, useState } from "react";

import { HOST } from "constants/api";
import localStorageHelper from "common/utils/localStorageHelper";
import LSData from "constants/LSData";

import { useAppLayoutContext } from "./AppLayoutContext";
import { useEffect } from "react";

const io = require("socket.io-client");

interface Socket {
  socket?: any;
}

const defaultContext: Socket = {};

const SocketContext = createContext(defaultContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const { token } = localStorageHelper("get", LSData.authData) || {};
  const { logout } = useAppLayoutContext();
  const [socket] = useState(io(HOST, { query: { token } }));

  socket.on("connect", () => console.log("SOCKET CONNECTED!..."));
  socket.on("logout", logout);
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
