import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";
import SignUpComponent from "../components/SignUpComponent";
import useDataStorage from "common/hooks/useDataStorage";
import useApiRequest from "common/hooks/useApiRequest";
import { API } from "constants/api";

const SignUpContainer: React.FC = () => {
  const history = useHistory();
  const { auth: authTranslations } = useTranslations();
  const { state: signUpData, updateState } = useDataStorage();
  const { api } = useApiRequest();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    updateState(name, value);
  };

  const onLogin = () => {
    console.log("LOGIN");
    history.push(ROUTES.auth.base);
  };

  const onSignUp = async () => {
    const { nickname, password }: { nickname?: string; password?: string } =
      signUpData;
    console.log("SIGN_UP");
    let res = await api(API.auth.signup.uri, API.auth.signup.method, {
      nickname,
      password,
    });
    console.log("RESULT", res);
    history.push(ROUTES.auth.base);
  };

  console.log(signUpData);

  return (
    <SignUpComponent
      signUpData={signUpData}
      translations={authTranslations}
      onLogin={onLogin}
      onChange={onChange}
      onSignUp={onSignUp}
    />
  );
};

export default SignUpContainer;
