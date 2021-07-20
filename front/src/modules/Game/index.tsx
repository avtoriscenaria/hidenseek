import React from "react";
import { Route, Switch } from "react-router-dom";

import ROUTES from "constants/routes";

import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";

const Game: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.game.menu} component={MenuScreen} />
      <Route exact path={ROUTES.game.base} component={GameScreen} />
    </Switch>
  );
};

export default Game;
