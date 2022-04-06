import React from "react";

import { Button, Input, Paper } from "common/components";
import useStyles from "common/hooks/useStyles";
import { isPasswordConfirmed, isSignUpValid } from "common/validators";

import useSignUpStateControl from "./useSignUpStateControl";
import styles from "./styles";

const SignUp: React.FC = () => {
  const { state, actions, apiService, translations } = useSignUpStateControl();
  const {
    nicknameInputProps,
    passwordInputProps,
    confirmPasswordInputProps,
    isFocusedConfirmPassword,
  } = state;
  const { onLogin, focusConfirmPassword } = actions;
  const { error, message, onSignUp } = apiService;

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>{translations.signUpHeader}</div>
        <div className={classes.inputFields}>
          <Input
            classes={classes.nickname}
            label={translations.nickname}
            error={error}
            {...nicknameInputProps}
          />
          <div className={classes.nicknameError}>{message}</div>
          <Input
            classes={classes.password}
            label={translations.password}
            type="password"
            {...passwordInputProps}
          />
          <Input
            classes={classes.confirmPassword}
            label={translations.confirmPassword}
            type="password"
            error={
              isFocusedConfirmPassword &&
              !isPasswordConfirmed(
                passwordInputProps.value,
                confirmPasswordInputProps.value
              )
            }
            onFocus={focusConfirmPassword}
            {...confirmPasswordInputProps}
          />
        </div>
        <Button
          classes={classes.signUp}
          label={translations.signUp}
          disabled={
            !isSignUpValid(
              nicknameInputProps.value,
              passwordInputProps.value,
              confirmPasswordInputProps.value
            )
          }
          onClick={onSignUp}
        />
        <div className={classes.loginContainer}>
          {translations.accountExistDescription + " "}
          <span className={classes.login} onClick={onLogin}>
            {translations.login}
          </span>
        </div>
      </Paper>
    </div>
  );
};

export default SignUp;
