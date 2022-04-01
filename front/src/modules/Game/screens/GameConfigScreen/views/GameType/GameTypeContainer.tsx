import React from "react";

import useStyles from "common/hooks/useStyles";
import useTranslations from "common/hooks/useTranslations";
import styles from "./styles";

const GameTypeContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();

  const classes = useStyles(styles);

  return <div className={classes.container}></div>;
};

export default GameTypeContainer;
