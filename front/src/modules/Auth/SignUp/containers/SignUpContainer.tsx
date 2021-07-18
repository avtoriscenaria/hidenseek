import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import useTranslations from "common/hooks/useTranslations";
import ROUTES from "constants/routes";
import SignUpComponent from "../components/SignUpComponent";
import useDataStorage from "common/hooks/useDataStorage";
import { useSignUpRequest } from "../hooks";

const SignUpContainer: React.FC = () => {
  const history = useHistory();
  const { auth: authTranslations } = useTranslations();
  const { state: signUpData, updateState } = useDataStorage();
  const { request } = useSignUpRequest();

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

    request({ nickname, password });
  };

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
