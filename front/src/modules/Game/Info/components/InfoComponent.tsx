import React from "react";
import Paper from "@material-ui/core/Paper";

import useStyles from "common/hooks/useStyles";
import styles from "../styles/InfoStyles";

const InfoComponent: React.FC = () => {
  const classeses = useStyles(styles);

  return <Paper className={classeses.container}> </Paper>;
};

export default InfoComponent;
