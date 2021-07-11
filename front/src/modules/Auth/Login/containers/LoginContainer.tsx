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
    // console.log("LOGIN");

    // let res = await api(API.auth.login.uri, API.auth.login.method, {
    //   nickname,
    //   password,
    // });
    // console.log("RESULT", res);
    // history.push(ROUTES.game.base);
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
