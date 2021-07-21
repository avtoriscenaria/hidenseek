import React from "react";
import Paper from "@material-ui/core/Paper";

import desk from "constants/deskConfig";
import Sell from "../containers/SellContainer";
import useStyles from "common/hooks/useStyles";
import styles from "../styles/DeskStyles";

const DeskComponent: React.FC = () => {
  const classes = useStyles(styles);

  return (
    <Paper className={classes.container}>
      {desk.map((l, j, rows) => (
        <div key={`line-${j}`} className={classes.deskLine}>
          {l.map((s, i, columns) => (
            <Sell
              key={`cell-${i}`}
              config={s}
              style={{
                borderRadius: borderRadius(
                  i,
                  columns.length - 1,
                  j,
                  rows.length - 1
                ),
                // backgroundColor: this.makeColor(player, not_you, {
                //   x: _i,
                //   y: i,
                // }),
                // width: this.makeSellSize(),
                // height: this.makeSellSize(),
              }}
            />
          ))}
        </div>
      ))}
    </Paper>
  );
};

const borderRadius = (
  i: number,
  rowSize: number,
  j: number,
  columnSize: number
) =>
  `${i === 0 && j === 0 ? 4 : 0}px ${i === rowSize && j === 0 ? 4 : 0}px ${
    i === rowSize && j === columnSize ? 4 : 0
  }px ${i === 0 && j === columnSize ? 4 : 0}px`;

export default DeskComponent;