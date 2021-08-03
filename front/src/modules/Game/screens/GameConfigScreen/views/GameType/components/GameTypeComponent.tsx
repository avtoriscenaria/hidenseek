import React from "react";

import useStyles from "common/hooks/useStyles";

import styles from "../styles";

interface GameTypeProps {
  translations: any;
}

const GameTypeComponent: React.FC<GameTypeProps> = ({ translations }) => {
  const classes = useStyles(styles);

  return <div className={classes.container}></div>;
};

export default GameTypeComponent;
