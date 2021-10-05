import React from "react";

import useStyles from "common/hooks/useStyles";

import styles from "../styles";

interface IGameType {
  translations: {};
}

const GameTypeComponent: React.FC<IGameType> = ({ translations }) => {
  const classes = useStyles(styles);

  return <div className={classes.container}></div>;
};

export default GameTypeComponent;
