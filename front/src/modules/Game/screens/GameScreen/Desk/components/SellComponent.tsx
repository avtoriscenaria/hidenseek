import React from "react";

import useStyles from "common/hooks/useStyles";
import { SellBorder } from "../interfaces";
import styles from "../styles/SellStyles";

interface SellComponentProps {
  borderConfig: SellBorder;
  style: Object;
  canMoveStyles?: Object;
  onClick: () => void;
}

const SellComponent: React.FC<SellComponentProps> = ({
  borderConfig,
  style: additionalStyle,
  canMoveStyles = {},
  onClick,
}) => {
  const classes = useStyles(styles);

  return (
    <div
      className={classes.cell}
      style={{ ...borderConfig, ...additionalStyle }}
      onClick={onClick}
    >
      <div style={canMoveStyles} />
    </div>
  );
};

export default SellComponent;
