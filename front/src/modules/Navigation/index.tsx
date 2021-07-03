import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import ROUTES from "constants/routes";
import Game from "modules/Game";

const Navigation = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.game.base} component={Game} />
      </Switch>
    </Router>
  );
};

export default Navigation;
