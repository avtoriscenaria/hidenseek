import Button from "@material-ui/core/Button";

import useStyles from "../../hooks/useStyles";
import styles from "./styles";

interface IButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  classes?: string;
  type?: "inherit" | "default" | "primary" | "secondary";
}

export default function ContainedButton({
  label,
  onClick,
  disabled,
  classes: propClass,
  type = "primary",
}: IButton) {
  const classes = useStyles(styles);
  const additionalClass = propClass ? ` ${propClass}` : "";

  return (
    <Button
      className={`${classes.button}${additionalClass}`}
      variant="contained"
      color={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
