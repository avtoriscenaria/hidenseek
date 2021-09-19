import React, { memo, useEffect, useState } from "react";

import { STEP_INTERVAL } from "constants/api";

const SECONDS_INTERVAL = STEP_INTERVAL / 1000;

const Timer: React.FC<{ timer?: number }> = memo(({ timer }) => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>();

  useEffect(() => {
    if (timeLeft === undefined && timer !== undefined) {
      const initialTime = SECONDS_INTERVAL - timer;
      console.log("initialTime", initialTime);
      setTimeLeft(initialTime);
    }
  }, [timeLeft, timer]);

  useEffect(() => {
    const localTimer = setTimeout(() => {
      console.log("TIK");
      if (timeLeft) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(localTimer);
  });

  useEffect(() => {
    if (timer && timeLeft !== undefined) {
      setTimeLeft(SECONDS_INTERVAL);
    }
  }, [timer]);

  return <div>{timeLeft}</div>;
});

export default Timer;
