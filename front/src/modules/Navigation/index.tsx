import { Router, Switch, Route as LibRoute, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import { AppLayoutContextProvider } from "contexts/AppLayoutContext";
import { SocketContextProvider } from "contexts/SocketContext";
import ROUTES from "constants/routes";
import Route from "common/components/Route";
import Auth from "modules/Auth";
import Game from "modules/Game";
import Account from "modules/Account";

const Navigation = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <AppLayoutContextProvider>
        <Switch>
          <LibRoute
            exact
            path={"/"}
            component={() => <Redirect to={ROUTES.auth.base} />}
          />
          <LibRoute path={ROUTES.auth.base} component={Auth} />

          <SocketContextProvider>
            <Route path={ROUTES.game.base} component={Game} />
            <Route path={ROUTES.account.base} component={Account} />
          </SocketContextProvider>
        </Switch>
      </AppLayoutContextProvider>
    </Router>
  );
};

export default Navigation;
