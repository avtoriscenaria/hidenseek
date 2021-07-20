import React from "react";

import useTranslations from "common/hooks/useTranslations";

import AccountComponent from "../components/AccountComponent";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

const AccountContainer: React.FC = () => {
  const { logout } = useAppLayoutContext();
  const { account: accountTranslations } = useTranslations();

  return (
    <AccountComponent translations={accountTranslations} logout={logout} />
  );
};

export default AccountContainer;
