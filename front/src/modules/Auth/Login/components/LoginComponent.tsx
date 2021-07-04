import React from "react";
import { Paper } from "@material-ui/core";

import Input from "common/components/Input";
import useStyles from "common/hooks/useStyles";
import styles from "../styles";

interface LoginComponentProps {
  translations: any;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ translations }) => {
  const classess = useStyles(styles);

  return (
    <div className={classess.container}>
      <Paper className={classess.paper}>
        <div className={classess.header}>{translations.welcome}</div>
        <div className={classess.inputFields}>
          <Input label={translations.nickname} />
          <Input label={translations.password} />
        </div>
        <div className={classess.registrationContainer}>
          {translations.accountNotExistDescription + " "}
          <span className={classess.registration}>{translations.signUp}</span>
        </div>
      </Paper>
    </div>
  );
};

export default LoginComponent;
