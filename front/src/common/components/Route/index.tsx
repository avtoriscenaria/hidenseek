import { Route, Redirect } from "react-router-dom";

import ROUTES from "constants/routes";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

interface ISmartRoute {
  exact?: boolean;
  path: string;
  component: React.FC;
}

export default function SmartRoute(props: ISmartRoute) {
  // const { isAuthorized } = useAppLayoutContext();
  const isAuthorized = false;

  return isAuthorized ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.auth.base} />
  );
}
