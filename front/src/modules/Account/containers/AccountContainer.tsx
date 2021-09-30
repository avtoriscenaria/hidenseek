import React from "react";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

import AccountComponent from "../components/AccountComponent";

const AccountContainer: React.FC = () => {
  const { logout } = useAppLayoutContext();
  const { account: accountTranslations } = useTranslations();

  return (
    <AccountComponent translations={accountTranslations} logout={logout} />
  );
};

export default AccountContainer;
