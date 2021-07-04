import ROUTES from "constants/routes";
import React from "react";
import { Route, MemoryRouter } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

const Auth: React.FC = () => {
  return (
    <MemoryRouter initialEntries={[ROUTES.auth.base]}>
      <Route exact path={ROUTES.auth.base} component={Login} />
      <Route path={ROUTES.auth.signUp} component={SignUp} />
    </MemoryRouter>
  );
};

export default Auth;
