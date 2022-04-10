import React from "react";
import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useStyles, useTranslations } from "common/hooks";
import { getMyGamePlayer, getGame } from "common/selectors";
import { copyText } from "common/utils";
import { useAppSelector } from "redux/hooks";
import { setOption } from "redux/reducers";
import { useSocketContext } from "SocketContext";

import styles from "./styles";
import { PlayerConfig } from "../../components/PlayerConfig";

const GAME_KEY = "gameKey";

const PlayersConfigContainer: React.FC = () => {
  const dispatch = useDispatch();
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

  const copyGameKey = () => {
    copyText(GAME_KEY);
    dispatch(
      setOption({
        message: { text: translations.successCopy, type: "success" },
      })
    );
  };

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div className={classes.gameKeyContainer} onClick={copyGameKey}>
        <div className={classes.gameKeyLabel}>{translations.gameKey + ":"}</div>
        <div className={classes.gameKey} id={GAME_KEY} tabIndex={1}>
          {game.gameKey}
        </div>
        <div className={classes.gameKeyIcon}>
          <ContentCopyIcon fontSize="small" />
        </div>
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
