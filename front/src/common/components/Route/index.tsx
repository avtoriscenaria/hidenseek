import ROUTES from "constants/routes";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import { Route, Redirect } from "react-router-dom";

interface SmartRouteProps {
  exact?: boolean;
  path: string;
  component: React.FC;
}

export default function SmartRoute(props: SmartRouteProps) {
  const { isAuthorized } = useAppLayoutContext();
  return isAuthorized ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.auth.base} />
  );
}
