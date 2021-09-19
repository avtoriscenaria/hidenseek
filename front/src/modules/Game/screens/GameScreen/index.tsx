import React from "react";
import { Redirect } from "react-router-dom";

import Timer from "common/components/Timer";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";
import { useSocketContext } from "contexts/Socket/SocketContext";
import { endTurn } from "contexts/Socket/helpers/SocketIo";
import Button from "common/components/Button";

import Desk from "./Desk";
import Info from "./Info";
import styles from "./styles";

const GameScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { hasGame } = useAppLayoutContext();
  const { timer } = useSocketContext();

  return !hasGame ? (
    <Redirect to={ROUTES.game.menu} />
  ) : (
    <div>
      <div className={classes.header}>
        <div className={classes.timerContainer}>
          <Timer timer={timer} />
          <Button onClick={endTurn} label={"END"} />
        </div>
      </div>
      <div className={classes.body}>
        <Desk />
        <Info />
      </div>
    </div>
  );
};

export default GameScreen;
