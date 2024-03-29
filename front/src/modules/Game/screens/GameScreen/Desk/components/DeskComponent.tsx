import React from "react";
import Paper from "@material-ui/core/Paper";

import desk from "constants/deskConfig";
import useStyles from "common/hooks/useStyles";

import Sell from "../containers/SellContainer";
import styles from "../styles/DeskStyles";

interface IDeskComponent {
  caught?: boolean;
  won?: boolean;
  modalDescription: string;
}

const DeskComponent: React.FC<IDeskComponent> = ({
  caught,
  won,
  modalDescription,
}) => {
  const classes = useStyles((theme) => styles(theme, { won }));
  const showBackDrop = caught || won;

  return (
    <Paper className={classes.container}>
      {showBackDrop && (
        <div className={classes.caughtBackdrop}>
          <div className={classes.caughtBackdropLabel}>{modalDescription}</div>
          <div className={classes.backdrop} />
        </div>
      )}
      {desk.map((l, j, rows) => (
        <div key={`line-${j}`} className={classes.deskLine}>
          {l.map((s, i, columns) => (
            <Sell
              key={`cell-${i}`}
              config={s}
              coordinates={{ x: i + 1, y: 10 - j }}
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
