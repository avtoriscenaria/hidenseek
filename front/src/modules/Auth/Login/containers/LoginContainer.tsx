import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import useTranslations from "common/hooks/useTranslations";
import useDataStorage from "common/hooks/useDataStorage";
import useApiRequest from "common/hooks/useApiRequest";
import ROUTES from "constants/routes";
import { API } from "constants/api";
import LoginComponent from "../components/LoginComponent";

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const { auth: authTranslations } = useTranslations();
  const { state: loginData, updateState } = useDataStorage();
  const { api } = useApiRequest();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    updateState(name, value);
  };

  const onLogin = async () => {
    console.log("LOGIN");
    const { nickname, password }: { nickname?: string; password?: string } =
      loginData;

    let res = await api(API.auth.login.uri, API.auth.login.method, {
      nickname,
      password,
    });
    console.log("RESULT", res);
    history.push(ROUTES.game.base);
  };

  const onSignUp = () => {
    console.log("SIGN_UP");
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
