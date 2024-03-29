import React, { memo } from "react";

import useStyles from "common/hooks/useStyles";
import { IGamePlayer } from "common/interfaces/Game";

import styles from "../styles/PlayerStyles";
import { IInfoTranslations } from "../interfaces";

interface IPlayerComponent {
  player: IGamePlayer;
  isMyGamePlayer: boolean;
  translations: IInfoTranslations;
}

const PlayerComponent: React.FC<IPlayerComponent> = memo(
  ({
    player: {
      nickname,
      color,
      hunter: isHunter = false,
      caught: isCaught = false,
    },
    isMyGamePlayer,
    translations: { hunter, caughtPlayer },
  }) => {
    const classes = useStyles((theme) =>
      styles(theme, { isHunter, isCaught, isMyGamePlayer })
    );

    return (
      <div className={classes.container}>
        <div
          className={classes.playerColor}
          style={{ backgroundColor: color }}
        />
        <div className={classes.nickname}>{nickname}</div>
        <div className={classes.status}>
          {isHunter ? hunter : isCaught ? caughtPlayer : ""}
        </div>
      </div>
    );
  }
);

export default PlayerComponent;
