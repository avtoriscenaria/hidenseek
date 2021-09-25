import React from "react";

import { endTurn } from "contexts/Socket/helpers/SocketIo";
import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";
import Timer from "common/components/Timer";

import styles from "../styles/HeaderStyles";

interface IHeaderComponent {
  timer?: number;
  step?: number;
}

const InfoComponent: React.FC<IHeaderComponent> = ({ timer, step }) => {
  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div className={classes.leftWrapper}>
        <Timer timer={timer} className={classes.timerContainer} />
        <Button onClick={endTurn} label={"END"} />
        <div className={classes.step}>{step}</div>
      </div>
    </div>
  );
};

export default InfoComponent;
