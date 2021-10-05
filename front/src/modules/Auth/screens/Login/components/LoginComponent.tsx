import React, { ChangeEvent } from "react";
import { Paper } from "@material-ui/core";

import Input from "common/components/Input";
import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";

import { ILoginData, ILoginTranslations } from "../interfaces";
import styles from "../styles";
import { isLoginValid } from "../utils";

interface ILoginComponent {
  loginData: ILoginData;
  translations: ILoginTranslations;
  error: boolean;
  message: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const LoginComponent: React.FC<ILoginComponent> = ({
  loginData: { nickname, password },
  translations,
  error,
  message,
  onChange,
  onLogin,
  onSignUp,
}) => {
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
            onChange={onChange}
          />
          <Input
            classes={classes.password}
            label={translations.password}
            name="password"
            type="password"
            value={password}
            error={error}
            onChange={onChange}
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

export default LoginComponent;
