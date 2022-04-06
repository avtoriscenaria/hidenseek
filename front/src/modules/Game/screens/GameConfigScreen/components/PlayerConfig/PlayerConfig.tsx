import Paper from "@material-ui/core/Paper";

import useStyles from "common/hooks/useStyles";
import { Checkbox } from "common/components";

import styles from "./styles";
import { IPlayerConfig } from "../../interfaces";

export default function PlayerConfig({
  player,
  isMyPlayerCreator,
  setHunter,
}: IPlayerConfig) {
  const classes = useStyles(styles);
  const { nickname, color, hunter, _id } = player;

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
            checked={Boolean(hunter)}
            onChange={(v) => setHunter(v, _id)}
            disabled={!isMyPlayerCreator}
          />
        </div>
      </Paper>
    </div>
  );
}
