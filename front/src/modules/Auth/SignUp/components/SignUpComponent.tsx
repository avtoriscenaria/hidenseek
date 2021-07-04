import React, { ChangeEvent } from "react";
import { Paper } from "@material-ui/core";

import Input from "common/components/Input";
import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";
import { SignUpData } from "../interfaces";
import { isSignUpValid } from "../utils";
import styles from "../styles";

interface SignUpComponentProps {
  signUpData: SignUpData;
  translations: any;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({
  signUpData: { nickname, password, confirmPassword },
  translations,
  onChange,
  onLogin,
  onSignUp,
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
            value={nickname}
            onChange={onChange}
          />
          <Input
            classes={classes.password}
            label={translations.password}
            name="password"
            value={password}
            onChange={onChange}
          />
          <Input
            classes={classes.confirmPassword}
            label={translations.confirmPassword}
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
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
