import React, { memo } from "react";

import { useStyles } from "common/hooks";
import { IGamePlayer } from "common/interfaces/Game";

import { IInfoTranslations } from "../interfaces";
import styles from "../styles/PlayerStyles";

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
      leave: isLeave = false,
    },
    isMyGamePlayer,
    translations: { hunter, caughtPlayer, leavePlayer },
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
        <div className={classes.leave}>{isLeave ? leavePlayer : ""}</div>
      </div>
    );
  }
);

export default PlayerComponent;
