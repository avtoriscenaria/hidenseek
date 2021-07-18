import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import { AppLayoutContextProvider } from "contexts/AppLayoutContext";

import ROUTES from "constants/routes";
import Auth from "modules/Auth";
import Game from "modules/Game";
import Account from "modules/Account";

const Navigation = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <AppLayoutContextProvider>
        <Switch>
          <Route
            exact
            path={"/"}
            component={() => <Redirect to={ROUTES.auth.base} />}
          />
          <Route path={ROUTES.auth.base} component={Auth} />
          <Route path={ROUTES.game.base} component={Game} />
          <Route path={ROUTES.account.base} component={Account} />
        </Switch>
      </AppLayoutContextProvider>
    </Router>
  );
};

export default Navigation;
