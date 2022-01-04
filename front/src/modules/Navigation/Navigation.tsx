import { Router, Switch, Route as LibRoute, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// import { SocketContextProvider } from "contexts/Socket/SocketContext";
import ROUTES from "constants/routes";
import Auth from "modules/Auth";
import GameContainer from "modules/GameContainer";

const Navigation = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <LibRoute
          exact
          path={"/"}
          component={() => <Redirect to={ROUTES.auth.base} />}
        />
        <LibRoute path={ROUTES.auth.base} component={Auth} />
        <GameContainer />
      </Switch>
    </Router>
  );
};

export default Navigation;
