import React from "react";

import useStyles from "common/hooks/useStyles";
import { GamePlayer } from "common/interfaces/Game";

import PlayerConfig from "../../../components/PlayerConfig";
import styles from "../styles";

const GAME_KEY = "gameKey";

interface PlayersConfigProps {
  gameKey?: string;
  players?: GamePlayer[];
  translations: any;
  isMyPlayerCreator: boolean;
  copyKey: (elementId: string) => void;
  setHunter: (value: boolean, id: string) => void;
}

const PlayersConfigComponent: React.FC<PlayersConfigProps> = ({
  players = [],
  gameKey = "",
  isMyPlayerCreator = false,
  copyKey,
  setHunter,
  translations,
}) => {
  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div
        className={classes.gameKeyContainer}
        onClick={() => copyKey(GAME_KEY)}
      >
        <div className={classes.gameKeyLabel}>{translations.gameKey + ":"}</div>
        <div className={classes.gameKey} id={GAME_KEY} tabIndex={1}>
          {gameKey}
        </div>
        {/* <FileCopyIcon /> */}
      </div>
      <div className={classes.header}>
        <div className={classes.playerColor}>{translations.playerColor}</div>
        <div className={classes.nickname}>{translations.nickname}</div>
        <div className={classes.hunter}>{translations.hunter}</div>
      </div>
      {players.map((p) => (
        <PlayerConfig
          isMyPlayerCreator={isMyPlayerCreator}
          key={`playerConfig-${p._id}`}
          player={p}
          setHunter={setHunter}
        />
      ))}
    </div>
  );
};

export default PlayersConfigComponent;
