import Paper from "@material-ui/core/Paper";

import useStyles from "common/hooks/useStyles";
import { IGamePlayer } from "common/interfaces/Game";
import Checkbox from "common/components/Checkbox";

import styles from "./styles";

interface PlayerConfigProps {
  player: IGamePlayer;
  isMyPlayerCreator: boolean;
  setHunter: (value: boolean, id: string) => void;
}

export default function PlayerConfig({
  player,
  isMyPlayerCreator,
  setHunter,
}: PlayerConfigProps) {
  const classes = useStyles(styles);
  const { nickname, color, hunter = false, _id } = player;

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
          <Checkbox
            checked={hunter}
            onChange={(v) => setHunter(v, _id)}
            disabled={!isMyPlayerCreator}
          />
        </div>
      </Paper>
    </div>
  );
}
