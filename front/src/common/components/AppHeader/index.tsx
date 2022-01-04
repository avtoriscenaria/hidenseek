import React from "react";
import { useHistory } from "react-router-dom";

import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

import AppHeader from "./AppHeaderComponent";
import { useAppSelector } from "redux/hooks";
import { getIsAuthorised } from "common/selectors";

export default function AppHeaderContainer() {
  const history = useHistory();
  const { main: maintTranslations } = useTranslations();

  const isAuthorized = useAppSelector(getIsAuthorised);

  const disableTitleNavigation = !isAuthorized;

  const handleGame = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthorized) {
      console.log("handleGame");
      // history.push(ROUTES.game.base);
    }
  };

  const handleMenu = () => {
    history.push(ROUTES.account.base);
  };

  return (
    <AppHeader
      translations={maintTranslations}
      isAuthorized={isAuthorized}
      disableTitleNavigation={disableTitleNavigation}
      handleGame={handleGame}
      handleMenu={handleMenu}
    />
  );
}
