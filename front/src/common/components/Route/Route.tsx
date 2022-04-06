import { Route, Redirect } from "react-router-dom";

import ROUTES from "constants/routes";
import { getIsAuthorised } from "common/selectors";
import { useAppSelector } from "redux/hooks";

interface ISmartRoute {
  exact?: boolean;
  path: string;
  component: React.FC;
}

export default function SmartRoute(props: ISmartRoute) {
  const isAuthorized = useAppSelector(getIsAuthorised);

  return isAuthorized ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.auth.base} />
  );
}
