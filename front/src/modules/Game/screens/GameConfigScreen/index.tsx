import React from "react";
import { Redirect } from "react-router-dom";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";

import styles from "./styles";

const GameConfigScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { hasGame } = useAppLayoutContext();

  return !hasGame ? (
    <Redirect to={ROUTES.game.menu} />
  ) : (
    <div className={classes.container}></div>
  );
};

export default GameConfigScreen;
