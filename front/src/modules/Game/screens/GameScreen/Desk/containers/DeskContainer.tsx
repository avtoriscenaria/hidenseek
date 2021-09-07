import React, { useEffect, useRef } from "react";

import useTranslations from "common/hooks/useTranslations";
import { STEP_INTERVAL } from "constants/api";
import { useSocketContext } from "contexts/Socket/SocketContext";
import DeskComponent from "../components/DeskComponent";

const DeskContainer: React.FC = () => {
  const { game } = useTranslations();
  const { myGamePlayer: { caught } = { caught: false }, timer } =
    useSocketContext();

  useEffect(() => {
    console.log("TIMER", timer);

    if (timer !== undefined) {
      // setInterval(() => {
      //   console.log("TIK", timer);
      // }, 1_000);
    }
    // if (interval.current === undefined) {
    //   console.log("setInterval", interval.current);
    //   // interval.current = setInterval(() => {
    //   //   console.log("TIK", timer);
    //   // }, 1_000);
    // } else {
    //   clearInterval(interval);
    //   interval.current = undefined;
    //   console.log("clearInterval", interval.current);
    // }
  }, [timer]);

  return <DeskComponent caught={caught} caughtDescription={game.caught} />;
};

export default DeskContainer;
