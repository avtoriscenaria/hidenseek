import React from "react";
import TextField from "@material-ui/core/TextField";

import useStyles from "../../hooks/useStyles";
import styles from "./styles";

interface InputProps {
  label: string;
}

export default function Input({ label }: InputProps) {
  const classes = useStyles(styles);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label={label} variant="outlined" />
    </form>
  );
}
