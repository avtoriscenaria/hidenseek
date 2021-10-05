import React, { ChangeEvent } from "react";
import { Paper } from "@material-ui/core";

import Input from "common/components/Input";
import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";

import { ISignUpData, ISignUpTranslations } from "../interfaces";
import { isSignUpValid, isPasswordConfirmed } from "../utils";
import styles from "../styles";

interface ISignUpComponent {
  signUpData: ISignUpData;
  translations: ISignUpTranslations;
  error: boolean;
  message: string;
  isFocusedConfirmPassword: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onLogin: () => void;
  onSignUp: () => void;
  setIsFocusedConfirmPassword: () => void;
}

const SignUpComponent: React.FC<ISignUpComponent> = ({
  signUpData: { nickname, password, confirmPassword },
  translations,
  error,
  message,
  isFocusedConfirmPassword,
  onChange,
  onLogin,
  onSignUp,
  setIsFocusedConfirmPassword,
}) => {
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
            value={nickname}
            onChange={onChange}
          />
          <div className={classes.nicknameError}>{message}</div>
          <Input
            classes={classes.password}
            label={translations.password}
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <Input
            classes={classes.confirmPassword}
            label={translations.confirmPassword}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            error={
              isFocusedConfirmPassword &&
              !isPasswordConfirmed(password, confirmPassword)
            }
            onChange={onChange}
            onFocus={setIsFocusedConfirmPassword}
          />
        </div>
        <Button
          classes={classes.signUp}
          label={translations.signUp}
          disabled={!isSignUpValid(nickname, password, confirmPassword)}
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

export default SignUpComponent;
