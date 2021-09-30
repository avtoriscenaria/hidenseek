import React from "react";
import { Redirect } from "react-router-dom";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";
import { useSocketContext } from "contexts/Socket/SocketContext";
import { GAME_STATUSES } from "constants/gameConstants";

import Header from "./Header";
import Desk from "./Desk";
import Info from "./Info";
import styles from "./styles";

const GameScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { hasGame } = useAppLayoutContext();
  const { game } = useSocketContext();

  const isRedirect = !hasGame || game?.status === GAME_STATUSES.start;

  return isRedirect ? (
    <Redirect to={!hasGame ? ROUTES.game.menu : ROUTES.game.config} />
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
