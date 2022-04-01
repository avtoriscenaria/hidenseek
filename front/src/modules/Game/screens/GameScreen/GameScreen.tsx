import React from "react";
import useStyles from "common/hooks/useStyles";

import Header from "./Header";
import Desk from "./Desk";
import Info from "./Info";
import styles from "./styles";

const GameScreen: React.FC = () => {
  const classes = useStyles(styles);

  return (
    <div>
      <Header />
      <div className={classes.body}>
        <Desk />
        <Info />
      </div>
    </div>
  );
};

export default GameScreen;
