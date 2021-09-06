import React from "react";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";

import GameType from "./views/GameType";
import PlayersConfig from "./views/PlayersConfig";
import styles from "./styles";

const GameConfigScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { game: gameTranslations } = useTranslations();

  const { hasGame } = useAppLayoutContext();

  const startGame = () => {
    console.log("startGame");
    //socket.emit("start_game");
  };

  return !hasGame ? (
    <Redirect to={ROUTES.game.menu} />
  ) : (
    <div className={classes.container}>
      <Paper className={classes.wrapper}>
        <div className={classes.menuActions}>
          <GameType />
          <div className={classes.dividerContainer}>
            <Divider className={classes.divider} orientation="vertical" />
          </div>

          <PlayersConfig />
        </div>
        <div className={classes.startGame}>
          <Button label={gameTranslations.startGame} onClick={startGame} />
        </div>
      </Paper>
    </div>
  );
};

export default GameConfigScreen;
