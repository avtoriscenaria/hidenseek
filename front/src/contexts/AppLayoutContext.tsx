import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import AppLayout from "common/containers/AppLayoutContainer";
import verifyJWT from "common/utils/verifyJWT";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { useEffect } from "react";
import localStorageHelper from "common/utils/localStorageHelper";
import Player from "common/interfaces/Player";

interface AppLayoutProps {
  isAuthorized: boolean;
  isInGame: boolean;
  player?: Player;
  setIsAuthorized: (value: boolean) => void;
  setIsInGame: (value: boolean) => void;
  logout: () => void;
}

const defaultContext: AppLayoutProps = {
  isAuthorized: false,
  isInGame: false,
  setIsAuthorized: () => {},
  setIsInGame: () => {},
  logout: () => {},
};

const AppLayoutContext = createContext(defaultContext);

export const AppLayoutContextProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(defaultContext.isAuthorized);
  const [isInGame, setIsInGame] = useState(defaultContext.isInGame);
  const [player, setPlayer] = useState<Player | undefined>();

  useEffect(() => {
    verifyJWT(({ isVerified, player } = { isVerified: false }) => {
      setIsAuthorized(isVerified);
      setIsAppLoaded(true);
      if (!isVerified) {
        localStorageHelper("remove", LSData.authData);
        history.push(ROUTES.auth.base);
      } else {
        setPlayer(player);
        history.push(ROUTES.game.base);
      }
    });
  }, [history]);

  const logout = () => {
    localStorage.removeItem(LSData.authData);
    setIsAuthorized(false);
    history.push(ROUTES.auth.base);
  };

  return (
    <AppLayoutContext.Provider
      value={{
        isAuthorized,
        isInGame,
        player,
        setIsAuthorized,
        setIsInGame,
        logout,
      }}
    >
      <AppLayout>{isAppLoaded ? children : <div>LOADER...</div>}</AppLayout>
    </AppLayoutContext.Provider>
  );
};

export const useAppLayoutContext = (): AppLayoutProps =>
  useContext(AppLayoutContext);

export default AppLayoutContext;
