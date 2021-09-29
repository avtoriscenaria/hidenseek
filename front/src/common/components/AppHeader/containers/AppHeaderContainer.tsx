import React from "react";
import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

import AppHeader from "../components/AppHeaderComponent";

export default function AppHeaderContainer() {
  const history = useHistory();
  const { isAuthorized } = useAppLayoutContext();

  const disableTitleNavigation = !isAuthorized;

  const handleGame = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthorized) {
      history.push(ROUTES.game.base);
    }
  };

  const handleMenu = () => {
    history.push(ROUTES.account.base);
  };

  return (
    <AppHeader
      isAuthorized={isAuthorized}
      disableTitleNavigation={disableTitleNavigation}
      handleGame={handleGame}
      handleMenu={handleMenu}
    />
  );
}
