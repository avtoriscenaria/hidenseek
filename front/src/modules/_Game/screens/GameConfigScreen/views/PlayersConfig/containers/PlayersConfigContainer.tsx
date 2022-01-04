import React from "react";

import { setHunterRoleSocket } from "contexts/Socket/helpers/SocketIo";
import useTranslations from "common/hooks/useTranslations";
import copyText from "common/utils/copyText";

import { useAppSelector } from "redux/hooks";
import { getGame } from "common/selectors";
import PlayerConfig from "../../../components/PlayerConfig";
import useStyles from "common/hooks/useStyles";
import styles from "../styles";

const GAME_KEY = "gameKey";

const PlayersConfigContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const game = useAppSelector(getGame);
  // const { myGamePlayer } = useSocketContext();
  const isMyPlayerCreator = false;

  const setHunter = (value: boolean, id: string) => {
    if (value && id) {
      setHunterRoleSocket(id);
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

  // return (
  //   <PlayersConfigComponent
  //     gameKey={game?.gameKey}
  //     players={game?.players}
  //     isMyPlayerCreator={Boolean(myGamePlayer?.creator)}
  //     translations={gameTranslations}
  //     copyKey={copyText}
  //     setHunter={setHunter}
  //   />
  // );
};

export default PlayersConfigContainer;
