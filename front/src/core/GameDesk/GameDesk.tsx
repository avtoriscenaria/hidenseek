import React from "react";

import Paper from "../../shared/Paper";
import { deskConfig as desk } from "../settings";
import Сell from "../Сell";
import { getTranslations, getBorderRadius, getStyles } from "../helpers";
import styles from "./styles";

interface IGameDesk {
  game: any;
  myGamePlayer: any;
}

const GameDesk: React.FC<IGameDesk> = ({ game, myGamePlayer }) => {
  const { game: gameTranslations } = getTranslations();
  const { caught, won } = myGamePlayer;

  const modalDescription = Boolean(caught)
    ? gameTranslations.caught
    : Boolean(won)
    ? gameTranslations.won
    : "";

  const classes = getStyles((theme) => styles(theme, { won }));
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
            <Сell
              key={`cell-${i}`}
              config={s}
              coordinates={{ x: i + 1, y: 10 - j }}
              style={{
                borderRadius: getBorderRadius(
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

export default GameDesk;
