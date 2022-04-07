import React from "react";

import useStyles from "common/hooks/useStyles";

import styles from "./styles";

const GameTypeContainer: React.FC = () => {
  const classes = useStyles(styles);

  return <div className={classes.container}></div>;
};

export default GameTypeContainer;
