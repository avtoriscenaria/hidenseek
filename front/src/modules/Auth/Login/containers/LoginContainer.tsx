import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import LoginComponent from "../components/LoginComponent";
import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const { auth: authTranslations } = useTranslations();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    console.log(name, value);
  };

  const onLogin = () => {
    console.log("LOGIN");
  };

  const onSignUp = () => {
    console.log("SIGN_UP");
    history.push(ROUTES.auth.signUp);
  };

  return (
    <LoginComponent
      translations={authTranslations}
      onLogin={onLogin}
      onChange={onChange}
      onSignUp={onSignUp}
    />
  );
};

export default LoginContainer;
