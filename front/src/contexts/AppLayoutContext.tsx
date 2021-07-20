import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import AppLayout from "common/containers/AppLayoutContainer";
import verifyJWT from "common/utils/verifyJWT";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { useEffect } from "react";
import localStorageHelper from "common/utils/localStorageHelper";

interface Player {
  nickname?: string;
  admin?: boolean;
}

interface AppLayoutProps {
  isAuthorized: boolean;
  isInGame: boolean;
  player: Player;
  setIsAuthorized: (value: boolean) => void;
  setIsInGame: (value: boolean) => void;
  logout: () => void;
}

const defaultContext: AppLayoutProps = {
  isAuthorized: false,
  isInGame: false,
  player: {},
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
  const [player, setPlayer] = useState<Player>(defaultContext.player);

  useEffect(() => {
    verifyJWT((isVerified) => {
      setIsAuthorized(isVerified);
      setIsAppLoaded(true);
      if (!isVerified) {
        localStorageHelper("remove", LSData.authData);
        history.push(ROUTES.auth.base);
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
