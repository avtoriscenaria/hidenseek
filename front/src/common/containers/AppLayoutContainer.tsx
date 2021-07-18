import React from "react";

import AppHeader from "../components/AppHeader";
import useStyles from "common/hooks/useStyles";
import styles from "../styles/AppLayoutStyles";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles(styles);

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.body}>{children}</div>
    </div>
  );
}
