import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import useTranslations from "common/hooks/useTranslations";
import useDataStorage from "common/hooks/useDataStorage";
import ROUTES from "constants/routes";

import LoginComponent from "../components/LoginComponent";
import { useLoginRequest } from "../hooks";

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const { auth: authTranslations } = useTranslations();
  const { state: loginData, updateState } = useDataStorage();
  const { request } = useLoginRequest();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    updateState(name, value);
  };

  const onLogin = async () => {
    request(loginData);
  };

  const onSignUp = () => {
    history.push(ROUTES.auth.signUp);
  };

  return (
    <LoginComponent
      loginData={loginData}
      translations={authTranslations}
      onLogin={onLogin}
      onChange={onChange}
      onSignUp={onSignUp}
    />
  );
};

export default LoginContainer;
