import React from "react";
import Button from "@material-ui/core/Button";

import useStyles from "../../hooks/useStyles";
import styles from "./styles";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  classes?: string;
}

export default function ContainedButtons({
  label,
  onClick,
  disabled,
  classes: propClass,
}: ButtonProps) {
  const classes = useStyles(styles);
  const additionalClass = propClass ? ` ${propClass}` : "";

  return (
    <Button
      className={`${classes.button}${additionalClass}`}
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
