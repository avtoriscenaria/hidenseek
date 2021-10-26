import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import useTranslations from "common/hooks/useTranslations";
import useDataStorage from "common/hooks/useDataStorage";
import ROUTES from "constants/routes";
import Paper from "shared/Paper";
import Input from "common/components/Input";
import Button from "common/components/Button";

import { useLoginRequest } from "./hooks";
import { isLoginValid } from "./helpers";
import useStyles from "common/hooks/useStyles";
import styles from "./styles";
import useLoginStateControl from "./useLoginStateControl";

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const { auth: translations } = useTranslations();
  const {
    state: { nickname, password },
    setValue,
    onLogin,
    error,
    message,
  } = useLoginStateControl();
  // const { state: loginData, updateState } = useDataStorage();
  // const { request, error, message } = useLoginRequest();

  // const onLogin = async () => {
  //   request(loginData);
  // };

  const onSignUp = () => {
    history.push(ROUTES.auth.signUp);
  };

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>{translations.welcome}</div>
        <div className={classes.inputFields}>
          <Input
            classes={classes.nickname}
            label={translations.nickname}
            name="nickname"
            value={nickname}
            error={error}
            onChange={setValue}
          />
          <Input
            classes={classes.password}
            label={translations.password}
            name="password"
            type="password"
            value={password}
            error={error}
            onChange={setValue}
          />
        </div>
        <div className={classes.error}>{message}</div>
        <Button
          classes={classes.login}
          label={translations.login}
          disabled={!isLoginValid(nickname, password)}
          onClick={onLogin}
        />
        <div className={classes.registrationContainer}>
          {translations.accountNotExistDescription + " "}
          <span className={classes.registration} onClick={onSignUp}>
            {translations.signUp}
          </span>
        </div>
      </Paper>
    </div>
  );
};

export default LoginContainer;
