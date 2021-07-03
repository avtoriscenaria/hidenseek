import React from "react";

import Desk from "./Desk/containers/DeskContainer";
import Info from "./Info/containers/InfoContainer";
import useStyles from "common/hooks/useStyles";
import styles from "./styles";

const Game: React.FC = () => {
  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <Desk />
      <Info />
    </div>
  );
};

export default Game;
