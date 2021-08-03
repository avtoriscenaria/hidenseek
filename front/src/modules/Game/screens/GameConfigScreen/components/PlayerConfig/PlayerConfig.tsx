import Paper from "@material-ui/core/Paper";

import useStyles from "common/hooks/useStyles";
import { GamePlayer } from "common/interfaces/Game";
import Checkbox from "common/components/Checkbox";

import styles from "./styles";

interface PlayerConfigProps {
  player: GamePlayer;
  setHunter: (value: boolean) => void;
}

export default function PlayerConfig({ player, setHunter }: PlayerConfigProps) {
  const classes = useStyles(styles);
  const { nickname, color, hunter = false } = player;
  console.log(player);
  return (
    <div className={classes.container}>
      <Paper className={classes.wrapper}>
        <div className={classes.playerColor}>
          <div
            className="color"
            style={{
              backgroundColor: color,
            }}
          />
        </div>
        <div className={classes.nickname}>{nickname}</div>
        <div className={classes.hunter}>
          <Checkbox checked={hunter} onChange={setHunter} />
        </div>
      </Paper>
    </div>
  );
}
