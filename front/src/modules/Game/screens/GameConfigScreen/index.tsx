import React from "react";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import { onStartGameEmit } from "contexts/Socket/helpers/SocketIo";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";
import { useSocketContext } from "contexts/Socket/SocketContext";

import GameType from "./views/GameType";
import PlayersConfig from "./views/PlayersConfig";
import styles from "./styles";

const GameConfigScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { game: gameTranslations } = useTranslations();

  const { hasGame } = useAppLayoutContext();
  const { myGamePlayer, game = { players: [] } } = useSocketContext();

  const startGame = () => {
    console.log("startGame");
    onStartGameEmit();
  };

  const isCreator = Boolean(myGamePlayer?.creator);

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
          {isCreator ? (
            <Button
              disabled={game.players.length > 1}
              label={gameTranslations.startGame}
              onClick={startGame}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </Paper>
    </div>
  );
};

export default GameConfigScreen;
