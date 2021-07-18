import React from "react";

import useStyles from "common/hooks/useStyles";

import { SocketContextProvider } from "contexts/SocketContext";

import Desk from "./Desk/containers/DeskContainer";
import Info from "./Info/containers/InfoContainer";
import styles from "./styles";

const Game: React.FC = () => {
  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <SocketContextProvider>
        <Desk />
        <Info />
      </SocketContextProvider>
    </div>
  );
};

export default Game;
