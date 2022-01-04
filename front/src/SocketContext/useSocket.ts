import { useCallback, useEffect, useRef } from "react";
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

        socket.on("update_game", ({ game }: { game: IGame }) => {
          console.log("UPDATE GAME  SOCKET", game);
          dispatch(setGame(game));
        });

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
