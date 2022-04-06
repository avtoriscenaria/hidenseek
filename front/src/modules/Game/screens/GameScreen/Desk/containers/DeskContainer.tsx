import React from "react";

import useTranslations from "common/hooks/useTranslations";

import Paper from "@material-ui/core/Paper";

import desk from "constants/deskConfig";
import useStyles from "common/hooks/useStyles";

import Sell from "../containers/SellContainer";
import styles from "../styles/DeskStyles";
import { useAppSelector } from "redux/hooks";
import { getMyGamePlayer } from "common/selectors";

const DeskContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const { caught, won } = useAppSelector(getMyGamePlayer);

  const modalDescription = Boolean(caught)
    ? translations.caught
    : Boolean(won)
    ? translations.won
    : "";

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

export default DeskContainer;
