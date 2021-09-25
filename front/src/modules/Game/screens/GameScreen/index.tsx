import React from "react";
import { Redirect } from "react-router-dom";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";

import Header from "./Header";
import Desk from "./Desk";
import Info from "./Info";
import styles from "./styles";

const GameScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { hasGame } = useAppLayoutContext();

  return !hasGame ? (
    <Redirect to={ROUTES.game.menu} />
  ) : (
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
