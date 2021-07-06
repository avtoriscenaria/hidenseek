import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import ROUTES from "constants/routes";
import Auth from "modules/Auth";
import Game from "modules/Game";

const Navigation = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={"/"}
          component={() => <Redirect to={ROUTES.auth.base} />}
        />
        <Route path={ROUTES.auth.base} component={Auth} />
        <Route path={ROUTES.game.base} component={Game} />
      </Switch>
    </Router>
  );
};

export default Navigation;
