import React from "react";

import { getGameStatus } from "common/selectors";
import { GAME_STATUSES } from "constants/gameConstants";
import { useAppSelector } from "redux/hooks";

import { Menu, GameScreen, GameConfig } from "./screens";

const Game: React.FC = () => {
  const gameStatus = useAppSelector(getGameStatus);

  if (gameStatus === GAME_STATUSES.start) {
    return <GameConfig />;
  }

  if (
    gameStatus === GAME_STATUSES.in_process ||
    gameStatus === GAME_STATUSES.finished
  ) {
    return <GameScreen />;
  }

  return <Menu />;
};

export default Game;
