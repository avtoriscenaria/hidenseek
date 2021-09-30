import React from "react";

import useStyles from "common/hooks/useStyles";

import AppHeader from "../components/AppHeader";
import styles from "../styles/AppLayoutStyles";

interface IAppLayout {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayout) {
  const classes = useStyles(styles);

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.body}>{children}</div>
    </div>
  );
}
