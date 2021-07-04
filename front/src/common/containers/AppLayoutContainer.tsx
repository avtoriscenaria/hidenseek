import React from "react";

//import socket from "common/hooks/useSocketConnect";
import AppHeader from "../components/AppHeader";
import useStyles from "common/hooks/useStyles";
import styles from "../styles/AppLayoutStyles";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const classes = useStyles(styles);
  // socket.on("connect", () => {
  //   console.log("CONNECTED!");
  // });

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.body}>{children}</div>
    </div>
  );
}
