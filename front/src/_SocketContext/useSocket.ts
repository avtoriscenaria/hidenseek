import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { HOST } from "constants/api";
import { useDispatch } from "react-redux";
import { setOption } from "redux/reducers/options";
import { setGame } from "redux/reducers/game";
import { IGame } from "common/interfaces/Game";

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

        socket.once("update_game", (game: IGame) => {
          console.log("UPDATE GAME  SOCKET", game);
          dispatch(setGame(game));
        });

        socketRef.current = socket;
      }
    },
    [dispatch]
  );

  return {
    connect,
  };
};

export default useSocket;

// хук принимает название комнаты
// export const useChat = (roomId) => {
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [userId] = useLocalStorage("userId", nanoid(8));
//   const [username] = useLocalStorage("username");

//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io(SERVER_URL, {
//       query: { roomId },
//     });
//     socketRef.current.emit("user:add", { username, userId });

//     socketRef.current.on("users", (users) => {
//       setUsers(users);
//     });

//     socketRef.current.emit("message:get");

//     socketRef.current.on("messages", (messages) => {
//       const newMessages = messages.map((msg) =>
//         msg.userId === userId ? { ...msg, currentUser: true } : msg
//       );
//       setMessages(newMessages);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [roomId, userId, username]);

//   const sendMessage = ({ messageText, senderName }) => {
//     socketRef.current.emit("message:add", {
//       userId,
//       messageText,
//       senderName,
//     });
//   };

//   const removeMessage = (id) => {
//     socketRef.current.emit("message:remove", id);
//   };

//   useBeforeUnload(() => {
//     socketRef.current.emit("user:leave", userId);
//   });

//   return { users, messages, sendMessage, removeMessage };
// };
