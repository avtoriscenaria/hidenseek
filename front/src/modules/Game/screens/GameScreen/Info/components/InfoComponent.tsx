import React from "react";
import Paper from "@material-ui/core/Paper";

import { GamePlayer } from "common/interfaces/Game";
import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";

import Player from "./PlayerComponent";
import styles from "../styles/InfoStyles";

interface InfoComponentProps {
  players: GamePlayer[];
  translations: any;
  myGamePlayerId?: string;
  exitGame: () => void;
  onMenu: () => void;
}

const InfoComponent: React.FC<InfoComponentProps> = ({
  translations,
  players,
  myGamePlayerId = "",
  onMenu,
  exitGame,
}) => {
  const classeses = useStyles(styles);

  return (
    <Paper className={classeses.container}>
      {players.map((p) => (
        <Player
          key={p._id}
          player={p}
          translations={translations}
          isMyGamePlayer={myGamePlayerId === p._id}
        />
      ))}
      <div className={classeses.buttonsWrapper}>
        {/* <Button label={translations.toMenu} onClick={onMenu} /> */}
        <Button
          label={translations.exitGame}
          type="secondary"
          onClick={exitGame}
        />
      </div>
    </Paper>
  );
};

export default InfoComponent;
