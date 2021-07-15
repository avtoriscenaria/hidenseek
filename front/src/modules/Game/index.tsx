import React, { useEffect } from "react";

import useStyles from "common/hooks/useStyles";
import socket from "common/hooks/useSocketConnect";

import Desk from "./Desk/containers/DeskContainer";
import Info from "./Info/containers/InfoContainer";
import styles from "./styles";

const Game: React.FC = () => {
  const classes = useStyles(styles);

  useEffect(() => {
    socket.on("connect", () => console.log("SOCKET CONNECTED..."));
  }, []);

  return (
    <div className={classes.container}>
      <Desk />
      <Info />
    </div>
  );
};

export default Game;
