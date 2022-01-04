import React from "react";

import { useAppSelector } from "redux/hooks";
import { getGameStatus } from "common/selectors";

import Menu from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";
import GameConfig from "./screens/GameConfigScreen";

const Game: React.FC = () => {
  const gameStatus = useAppSelector(getGameStatus);
  console.log("GAS", gameStatus);
  if (gameStatus === "start") {
    return <GameConfig />;
  }

  if (gameStatus === "in_process") {
    return <GameScreen />;
  }

  return <Menu />;
};

export default Game;
