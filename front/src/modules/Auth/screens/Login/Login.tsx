import React, { memo } from "react";

import Paper from "shared/Paper";
import Input from "common/components/Input";
import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";
import { isLoginValid } from "common/validators";

import useLoginStateControl from "./hooks/useLoginStateControl";
import styles from "./styles";

const LoginContainer: React.FC = memo(() => {
  const { state, actions, apiService, translations } = useLoginStateControl();

  const { nickname, password, setValue } = state;
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
});

export default LoginContainer;
