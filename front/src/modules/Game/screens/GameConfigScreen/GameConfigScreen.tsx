import React, { useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IGamePlayer } from "common/interfaces/Game";
import useTranslations from "common/hooks/useTranslations";
import useStyles from "common/hooks/useStyles";
import { Button } from "common/components";
import { useSocketContext } from "SocketContext/SocketContext";

import { GameType, PlayersConfig } from "./views";
import styles from "./styles";
import { getGame, getPlayer } from "common/selectors";
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
  const { onStartGameEmit, leaveGameSocket } = useSocketContext();
  const game = useAppSelector(getGame);
  const player = useAppSelector(getPlayer);
  const myGamePlayer: any = useMemo(
    () => getMyGamePlayer(game.players, player._id),
    [game.players, player._id]
  );

  const startGame = () => {
    onStartGameEmit(game._id);
  };

  const exitGame = () => leaveGameSocket(game._id);

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
        <div className={classes.btnsContainer}>
          <Button
            label={gameTranslations.exitGame}
            type="secondary"
            onClick={exitGame}
          />
        </div>
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
