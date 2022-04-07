import React, { useEffect, useMemo, useState } from "react";

import { Button, Timer } from "common/components";
import { useStyles, useTranslations } from "common/hooks";
import { getGame, getMyGamePlayer, getTimer } from "common/selectors";
import { useAppSelector } from "redux/hooks";
import { useSocketContext } from "SocketContext";

import styles from "./styles";

const HeaderContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const [disabled, setDisabled] = useState(false);

  const { endTurnSocket } = useSocketContext();
  const timer = useAppSelector(getTimer);

  const { hide, players, _id } = useAppSelector(getGame);
  const myGamePlayer = useAppSelector(getMyGamePlayer);

  useEffect(() => {
    setDisabled(Boolean(myGamePlayer?.hunter) === hide);
  }, [hide, myGamePlayer?.hunter]);

  const endTurn = () => {
    setDisabled(true);
    endTurnSocket(_id);
  };

  const isDisabled = useMemo(
    () =>
      disabled ||
      players.some((p: any) => p.won) ||
      Boolean(myGamePlayer?.hunter) === hide,
    [disabled, hide, myGamePlayer?.hunter, players]
  );

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div className={classes.leftWrapper}>
        <Timer timer={timer} className={classes.timerContainer} />
        <Button
          onClick={endTurn}
          label={translations.endTurn}
          disabled={isDisabled}
        />
        <div className={classes.step}>{myGamePlayer?.step}</div>
      </div>
    </div>
  );
};

export default HeaderContainer;
