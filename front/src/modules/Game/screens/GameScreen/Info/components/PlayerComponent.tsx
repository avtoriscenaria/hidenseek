import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";

import useStyles from "common/hooks/useStyles";
import styles from "../styles/PlayerStyles";
import { GamePlayer } from "common/interfaces/Game";

interface IPlayerComponent {
  player: GamePlayer;
  translations: any;
}

const PlayerComponent: React.FC<IPlayerComponent> = memo(
  ({
    player: {
      nickname,
      color,
      hunter: isHunter = false,
      caught: isCaught = false,
    },
    translations: { hunter, caughtPlayer = false },
  }) => {
    const classes = useStyles((theme) => styles(theme, { isHunter, isCaught }));

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
