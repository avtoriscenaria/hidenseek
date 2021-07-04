import React from "react";

import LoginComponent from "../components/LoginComponent";
import useTranslations from "common/hooks/useTranslations";

const LoginContainer: React.FC = () => {
  const { auth: authTranslations } = useTranslations();

  return <LoginComponent translations={authTranslations} />;
};

export default LoginContainer;
