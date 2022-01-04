import React from "react";
import { Switch } from "react-router-dom";

import ROUTES from "constants/routes";
import Route from "common/components/Route";

import Menu from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";
import GameConfig from "./screens/GameConfigScreen";

const Game: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.game.menu} component={Menu} />
      <Route exact path={ROUTES.game.base} component={GameScreen} />
      <Route exact path={ROUTES.game.config} component={GameConfig} />
    </Switch>
  );
};

export default Game;
