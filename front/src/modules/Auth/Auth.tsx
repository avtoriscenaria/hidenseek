import React from "react";
import { Route, Switch } from "react-router-dom";

import ROUTES from "constants/routes";

import { Login, SignUp } from "./screens";

const Auth: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.auth.signUp} component={SignUp} />
      <Route path={ROUTES.auth.base} component={Login} />
    </Switch>
  );
};

export default Auth;
