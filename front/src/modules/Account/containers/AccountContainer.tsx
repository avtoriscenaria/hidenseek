import React from "react";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

import AccountComponent from "../components/AccountComponent";
import { useSocketContext } from "contexts/Socket/SocketContext";

const AccountContainer: React.FC = () => {
  const { logout: appContextLogout } = useAppLayoutContext();
  const { setConnected } = useSocketContext();
  const { account: accountTranslations } = useTranslations();

  const logout = () => {
    setConnected(false);
    appContextLogout();
  };

  return (
    <AccountComponent translations={accountTranslations} logout={logout} />
  );
};

export default AccountContainer;
