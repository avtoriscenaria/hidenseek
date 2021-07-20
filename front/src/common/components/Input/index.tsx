import { ChangeEvent, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "../../hooks/useStyles";
import styles from "./styles";

interface InputProps {
  label: string;
  name: string;
  value?: string;
  type?: string;
  error?: boolean;
  placeholder?: string;
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  classes?: string;
}

export default function Input({
  label,
  name,
  value = "",
  type,
  error,
  placeholder,
  multiline,
  onChange,
  onFocus = () => {},
  classes: propClass,
}: InputProps) {
  const classes = useStyles(styles);
  const [showPassword, setShowPassword] = useState(false);
  const additionalClass = propClass ? ` ${propClass}` : "";

  return (
    <FormControl
      className={`${classes.root}${additionalClass}`}
      variant="outlined"
      error={error}
    >
      <InputLabel htmlFor={`input-${name}`}>{label}</InputLabel>
      <OutlinedInput
        className={classes.input}
        id={`input-${name}`}
        label={label}
        type={type === "password" && !showPassword ? "password" : "text"}
        autoComplete="off"
        value={value}
        name={name}
        placeholder={placeholder}
        multiline={multiline}
        onChange={onChange}
        onFocus={onFocus}
        endAdornment={
          type !== "password" ? null : (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
        labelWidth={170}
      />
    </FormControl>
  );
}
