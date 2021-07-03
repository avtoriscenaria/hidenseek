import React from "react";

import Desk from "./Desk/containers/DeskContainer";
import useStyles from "common/hooks/useStyles";
import styles from "./styles";

const Game: React.FC = () => {
  const classes = useStyles(styles);

  return (
    <div className={classes.styles}>
      <Desk />
    </div>
  );
};

export default Game;
