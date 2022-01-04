import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import MainLoader from "common/components/MainLoader";
import AppLayout from "common/containers/AppLayoutContainer";
import verifyJWT from "common/utils/verifyJWT";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { useEffect } from "react";
import localStorageHelper from "common/utils/localStorageHelper";
import Player from "common/interfaces/Player";

import { logoutSocket } from "./Socket/helpers/SocketIo";

interface IAppLayout {
  isAuthorized: boolean;
  hasGame?: string;
  player?: Player;
  setIsAuthorized: (value: boolean) => void;
  setHasGame: (value?: string) => void;
  setPlayer: (player: Player) => void;
  logout: () => void;
}

const defaultContext: IAppLayout = {
  isAuthorized: false,
  setIsAuthorized: () => {},
  setHasGame: () => {},
  setPlayer: () => {},
  logout: () => {},
};

const AppLayoutContext = createContext(defaultContext);

export const AppLayoutContextProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(defaultContext.isAuthorized);
  const [hasGame, setHasGame] = useState<string | undefined>();
  const [player, setPlayer] = useState<Player | undefined>();

  useEffect(() => {
    verifyJWT(({ isVerified, player } = { isVerified: false }) => {
      setIsAuthorized(isVerified);
      if (!isVerified) {
        setIsAppLoaded(true);
        localStorageHelper("remove", LSData.authData);
        history.push(ROUTES.auth.base);
      } else {
        setPlayer(player);
        setHasGame(player?.game_id);
        setIsAppLoaded(true);

        if (Boolean(player?.game_id)) {
          history.push(ROUTES.game.base);
        } else {
          history.push(ROUTES.game.menu);
        }
      }
    });
  }, [history]);

  const logout = () => {
    localStorage.removeItem(LSData.authData);
    setIsAuthorized(false);
    logoutSocket();
    history.push(ROUTES.auth.base);
  };

  return (
    <AppLayoutContext.Provider
      value={{
        isAuthorized,
        hasGame,
        player,
        setIsAuthorized,
        setHasGame,
        setPlayer,
        logout,
      }}
    >
      <AppLayout>{isAppLoaded ? children : <MainLoader />}</AppLayout>
    </AppLayoutContext.Provider>
  );
};

export const useAppLayoutContext = (): IAppLayout =>
  useContext(AppLayoutContext);

export default AppLayoutContext;
