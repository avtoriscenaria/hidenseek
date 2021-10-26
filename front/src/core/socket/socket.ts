import io from "socket.io-client";

import { getHOST } from "../settings";

let socket: any;

export const initiateSocket = (
  setConnected: (value: boolean) => void,
  token?: string,
  room?: string,
  player_id?: string
) => {
  if (socket === undefined) {
    const HOST = getHOST();
    socket = io(HOST, {
      query: { token, room, player_id },
    });
  }
};
