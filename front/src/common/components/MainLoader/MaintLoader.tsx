import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "common/hooks/useStyles";

import styles from "./styles";

export default function MainLoader() {
  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <CircularProgress size={100} />
        <div className={classes.description}>...Loading</div>
      </div>
    </div>
  );
}
