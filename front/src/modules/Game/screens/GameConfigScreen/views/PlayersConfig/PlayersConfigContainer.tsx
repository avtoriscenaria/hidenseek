import React from "react";

import { useStyles, useTranslations } from "common/hooks";
import { getMyGamePlayer, getGame } from "common/selectors";
import { copyText } from "common/utils";
import { useAppSelector } from "redux/hooks";
import { useSocketContext } from "SocketContext";

import styles from "./styles";
import { PlayerConfig } from "../../components/PlayerConfig";

const GAME_KEY = "gameKey";

const PlayersConfigContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const { setHunterRoleSocket } = useSocketContext();
  const game = useAppSelector(getGame);
  const myGamePlayer = useAppSelector(getMyGamePlayer);
  const isMyPlayerCreator = Boolean(myGamePlayer.creator);

  const setHunter = (value: boolean, id: string) => {
    if (value && id) {
      setHunterRoleSocket(id, game._id);
    }
  };

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div
        className={classes.gameKeyContainer}
        onClick={() => copyText(GAME_KEY)}
      >
        <div className={classes.gameKeyLabel}>{translations.gameKey + ":"}</div>
        <div className={classes.gameKey} id={GAME_KEY} tabIndex={1}>
          {game.gameKey}
        </div>
        {/* <FileCopyIcon /> */}
      </div>
      <div className={classes.header}>
        <div className={classes.playerColor}>{translations.playerColor}</div>
        <div className={classes.nickname}>{translations.nickname}</div>
        <div className={classes.hunter}>{translations.hunter}</div>
      </div>
      {game.players.map((p: any) => (
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

export default PlayersConfigContainer;
