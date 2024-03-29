import React from "react";

import useStyles from "common/hooks/useStyles";
import { IGamePlayer } from "common/interfaces/Game";

import PlayerConfig from "../../../components/PlayerConfig";
import styles from "../styles";
import { IPlayersConfigTranslations } from "../../../interfaces";

const GAME_KEY = "gameKey";

interface IPlayersConfig {
  gameKey?: string;
  players?: IGamePlayer[];
  translations: IPlayersConfigTranslations;
  isMyPlayerCreator: boolean;
  copyKey: (elementId: string) => void;
  setHunter: (value: boolean, id: string) => void;
}

const PlayersConfigComponent: React.FC<IPlayersConfig> = ({
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
