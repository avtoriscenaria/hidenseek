import React from "react";

import useStyles from "common/hooks/useStyles";
import { SellBorder } from "../interfaces";
import styles from "../styles/SellStyles";

interface SellComponentProps {
  borderConfig: SellBorder;
  style: Object;
  onClick: () => void;
}

const SellComponent: React.FC<SellComponentProps> = ({
  borderConfig,
  style: additionalStyle,
  onClick,
}) => {
  const classes = useStyles(styles);

  return (
    <div
      className={classes.cell}
      style={{ ...borderConfig, ...additionalStyle }}
      onClick={onClick}
    ></div>
  );
};

export default SellComponent;
