import React from "react";

import useTranslations from "common/hooks/useTranslations";
//import { useAppLayoutContext } from "contexts/AppLayoutContext";
import Button from "common/components/Button";
//import { useSocketContext } from "contexts/Socket/SocketContext";
//import { useLogout } from "core/hooks";

const AccountContainer: React.FC = () => {
  //const { logout } = useLogout();
  // const { logout: appContextLogout } = useAppLayoutContext();
  // const { setConnected } = useSocketContext();
  const { account: translations } = useTranslations();

  const logout = () => {
    console.log("LOGOUT");
  };

  // const logout = () => {
  //   setConnected(false);
  //   appContextLogout();
  // };

  return (
    <div>
      <Button label={translations.logout} onClick={logout} />
    </div>
  );
};

export default AccountContainer;
