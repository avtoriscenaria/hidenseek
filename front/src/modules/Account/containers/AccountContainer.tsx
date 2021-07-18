import React from "react";

import useTranslations from "common/hooks/useTranslations";

import AccountComponent from "../components/AccountComponent";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

const AccountContainer: React.FC = () => {
  const { logout } = useAppLayoutContext();
  const translations = useTranslations();

  return (
    <AccountComponent translations={translations.account} logout={logout} />
  );
};

export default AccountContainer;
