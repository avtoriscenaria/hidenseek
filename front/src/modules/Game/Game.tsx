import React from "react";

import { useAppSelector } from "redux/hooks";
import { getGameStatus } from "common/selectors";

import { Menu, GameScreen, GameConfig } from "./screens";

const Game: React.FC = () => {
  const gameStatus = useAppSelector(getGameStatus);

  if (gameStatus === "start") {
    return <GameConfig />;
  }

  if (gameStatus === "in_process") {
    return <GameScreen />;
  }

  return <Menu />;
};

export default Game;
