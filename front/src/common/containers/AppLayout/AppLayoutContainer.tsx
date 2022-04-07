import React from "react";

import useStyles from "common/hooks/useStyles";
import { AppHeader, WarningNotification } from "common/components";

import styles from "./styles";

interface IAppLayout {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayout) {
  const classes = useStyles(styles);

  return (
    <div className={classes.root}>
      <AppHeader />
      <WarningNotification>
        <div className={classes.body}>{children}</div>
      </WarningNotification>
    </div>
  );
}
