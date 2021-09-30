import React, { memo, useEffect, useState } from "react";

import { STEP_INTERVAL } from "constants/api";

const SECONDS_INTERVAL = STEP_INTERVAL / 1000;

interface ITimer {
  timer?: number;
  className?: string;
}

const Timer: React.FC<ITimer> = memo(({ timer, className }) => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>();

  useEffect(() => {
    if (timeLeft === undefined && timer !== undefined) {
      const initialTime = SECONDS_INTERVAL - timer;
      setTimeLeft(initialTime);
    }
  }, [timeLeft, timer]);

  useEffect(() => {
    const localTimer = setTimeout(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return <div className={className}>{timeLeft}</div>;
});

export default Timer;
