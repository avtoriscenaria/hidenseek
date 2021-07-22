import React from "react";
import { Switch } from "react-router-dom";

import ROUTES from "constants/routes";
import Route from "common/components/Route";

import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";
import GameConfigScreen from "./screens/GameConfigScreen";

const Game: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.game.menu} component={MenuScreen} />
      <Route exact path={ROUTES.game.base} component={GameScreen} />
      <Route exact path={ROUTES.game.config} component={GameConfigScreen} />
    </Switch>
  );
};

export default Game;
