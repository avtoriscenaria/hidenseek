import ROUTES from "constants/routes";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

const Auth: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.auth.base} component={Login} />
      <Route path={ROUTES.auth.signUp} component={SignUp} />
    </Switch>
  );
};

export default Auth;
