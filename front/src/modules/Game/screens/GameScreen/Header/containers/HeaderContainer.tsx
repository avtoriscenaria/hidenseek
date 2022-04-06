import React, { useEffect, useMemo, useState } from "react";

import useTranslations from "common/hooks/useTranslations";

import useStyles from "common/hooks/useStyles";
import styles from "../styles/HeaderStyles";
import Button from "common/components/Button";
import Timer from "common/components/Timer";
import { useAppSelector } from "redux/hooks";
import { getGame, getMyGamePlayer, getTimer } from "common/selectors";
import { useSocketContext } from "SocketContext/SocketContext";

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
