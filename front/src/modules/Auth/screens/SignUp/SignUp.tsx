import React from "react";

import Paper from "shared/Paper";
import Input from "common/components/Input";
import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";
import { isPasswordConfirmed, isSignUpValid } from "common/validators";

import useSignUpStateControl from "./hooks/useSignUpStateControl";
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
            name="nickname"
            error={error}
            {...nicknameInputProps}
          />
          <div className={classes.nicknameError}>{message}</div>
          <Input
            classes={classes.password}
            label={translations.password}
            name="password"
            type="password"
            {...passwordInputProps}
          />
          <Input
            classes={classes.confirmPassword}
            label={translations.confirmPassword}
            name="confirmPassword"
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
