import { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";

import useStyles from "../../hooks/useStyles";
import styles from "./styles";

interface InputProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  classes?: string;
}

export default function Input({
  label,
  name,
  value = "",
  onChange,
  classes: propClass,
}: InputProps) {
  const classes = useStyles(styles);
  const additionalClass = propClass ? ` ${propClass}` : "";

  return (
    <form
      className={`${classes.root}${additionalClass}`}
      noValidate
      autoComplete="off"
    >
      <TextField
        className={classes.input}
        label={label}
        variant="outlined"
        name={name}
        value={value}
        onChange={onChange}
      />
    </form>
  );
}
