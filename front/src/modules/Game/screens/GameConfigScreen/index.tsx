import React, { useCallback, useMemo } from "react";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IGamePlayer } from "common/interfaces/Game";
import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import {
  onStartGameEmit,
  // updateGameSocket,
} from "contexts/Socket/helpers/SocketIo";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";
import { useSocketContext } from "SocketContext/SocketContext";

import GameType from "./views/GameType";
import PlayersConfig from "./views/PlayersConfig";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { getGame, getGameId, getPlayer } from "common/selectors";
import { useAppSelector } from "redux/hooks";

const getMyGamePlayer = (players: any, player_id: string) => {
  return players.find((p: any) => p._id === player_id);
};

const getHunter = (players: any) => {
  return players.some((p: IGamePlayer) => p.hunter);
};

const GameConfigScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { game: gameTranslations } = useTranslations();
  const { onStartGameEmit } = useSocketContext();
  const game = useAppSelector(getGame);
  const player = useAppSelector(getPlayer);
  const myGamePlayer: any = useMemo(
    () => getMyGamePlayer(game.players, player._id),
    [game.players, player._id]
  );

  const startGame = () => {
    console.log("startGame");
    onStartGameEmit();
  };

  const isCreator = Boolean(myGamePlayer?.creator);
  const isHunterSelected = useMemo(
    () => getHunter(game.players),
    [game.players]
  );

  return (
    <div className={classes.container}>
      <Paper className={classes.wrapper}>
        <div className={classes.menuActions}>
          <GameType />

          <div className={classes.dividerContainer}>
            <Divider className={classes.divider} orientation="vertical" />
          </div>

          <PlayersConfig />
        </div>

        <div className={classes.reloadDescription}></div>
        <div className={classes.startGame}>
          {isCreator ? (
            <Button
              disabled={game.players.length < 2 || !isHunterSelected}
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
