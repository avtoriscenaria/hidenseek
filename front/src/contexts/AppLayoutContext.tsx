import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import AppLayout from "common/containers/AppLayoutContainer";
import verifyJWT from "common/utils/verifyJWT";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { useEffect } from "react";

interface AppLayoutProps {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
  logout: () => void;
}

const defaultContext: AppLayoutProps = {
  isAuthorized: false,
  setIsAuthorized: () => {},
  logout: () => {},
};

const AppLayoutContext = createContext(defaultContext);

export const AppLayoutContextProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [isAuthorized, setIsAuthorized] = useState(defaultContext.isAuthorized);

  useEffect(() => {
    verifyJWT((isVerified) => {
      setIsAuthorized(isVerified);
      if (!isVerified) {
        history.push(ROUTES.auth.base);
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem(LSData.authData);
    setIsAuthorized(false);
    history.push(ROUTES.auth.base);
  };

  return (
    <AppLayoutContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        logout,
      }}
    >
      <AppLayout>{children}</AppLayout>
    </AppLayoutContext.Provider>
  );
};

export const useAppLayoutContext = (): AppLayoutProps =>
  useContext(AppLayoutContext);

export default AppLayoutContext;
