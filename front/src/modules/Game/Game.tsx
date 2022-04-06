import React from "react";

import { useAppSelector } from "redux/hooks";
import { getGameStatus } from "common/selectors";

import { Menu, GameScreen, GameConfig } from "./screens";
import { GAME_STATUSES } from "constants/gameConstants";

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
