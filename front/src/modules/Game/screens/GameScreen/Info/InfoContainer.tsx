import React from "react";
import Paper from "@material-ui/core/Paper";

import { Button } from "common/components";
import { useStyles, useTranslations } from "common/hooks";
import { getGame, getMyGamePlayer } from "common/selectors";
import { useAppSelector } from "redux/hooks";
import { useSocketContext } from "SocketContext";

import Player from "./components/PlayerComponent";
import styles from "./styles/InfoStyles";

const DeskContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const { players, _id } = useAppSelector(getGame);
  const myGamePlayer = useAppSelector(getMyGamePlayer);
  const { leaveGameSocket } = useSocketContext();

  const exitGame = () => leaveGameSocket(_id);

  const classeses = useStyles(styles);

  return (
    <Paper className={classeses.container}>
      {players.map((p: any) => (
        <Player
          key={p._id}
          player={p}
          translations={translations}
          isMyGamePlayer={myGamePlayer._id === p._id}
        />
      ))}
      <div className={classeses.buttonsWrapper}>
        <Button
          label={translations.exitGame}
          type="secondary"
          onClick={exitGame}
        />
      </div>
    </Paper>
  );
};

export default DeskContainer;
