import React from "react";
import { Redirect } from "react-router-dom";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";

import Desk from "./Desk";
import Info from "./Info";
import styles from "./styles";

const GameScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { isInGame } = useAppLayoutContext();

  return !isInGame ? (
    <Redirect to={ROUTES.game.menu} />
  ) : (
    <div className={classes.container}>
      <Desk />
      <Info />
    </div>
  );
};

export default GameScreen;
