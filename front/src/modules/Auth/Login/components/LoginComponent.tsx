import React, { ChangeEvent } from "react";
import { Paper } from "@material-ui/core";

import Input from "common/components/Input";
import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";
import styles from "../styles";

interface LoginComponentProps {
  translations: any;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  translations,
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
            onChange={onChange}
          />
          <Input
            classes={classes.password}
            label={translations.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <Button
          classes={classes.login}
          label={translations.login}
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
