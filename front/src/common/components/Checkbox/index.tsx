import React from "react";
import MUICheckbox from "@material-ui/core/Checkbox";

import useStyles from "common/hooks/useStyles";

import styles from "./styles";

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  const classes = useStyles(styles);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={classes.container}>
      <MUICheckbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
