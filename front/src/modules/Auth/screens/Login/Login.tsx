import React from "react";

import { Button, Input, Paper } from "common/components";
import useStyles from "common/hooks/useStyles";
import { isLoginValid } from "common/validators";

import useLoginStateControl from "./useLoginStateControl";
import styles from "./styles";

const LoginContainer: React.FC = () => {
  const { state, actions, apiService, translations } = useLoginStateControl();

  const { nicknameInputProps, passwordInputProps } = state;
  const { onSignUp } = actions;
  const { onLogin, error, message } = apiService;

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>{translations.welcome}</div>
        <div className={classes.inputFields}>
          <Input
            classes={classes.nickname}
            label={translations.nickname}
            error={error}
            {...nicknameInputProps}
          />
          <Input
            classes={classes.password}
            label={translations.password}
            type="password"
            error={error}
            {...passwordInputProps}
          />
        </div>
        <div className={classes.error}>{message}</div>
        <Button
          classes={classes.login}
          label={translations.login}
          disabled={
            !isLoginValid(nicknameInputProps.value, passwordInputProps.value)
          }
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
