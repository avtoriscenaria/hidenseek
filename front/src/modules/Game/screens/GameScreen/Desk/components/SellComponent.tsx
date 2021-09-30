import React from "react";
import ClearIcon from "@material-ui/icons/Clear";

import useStyles from "common/hooks/useStyles";

import { ISellBorder } from "../interfaces";
import styles from "../styles/SellStyles";

interface ISellComponent {
  borderConfig: ISellBorder;
  style: Object;
  canMoveStyles?: { backgroundColor: string; opacity: number; height: string };
  crossColor?: string;
  onClick: () => void;
}

const SellComponent: React.FC<ISellComponent> = ({
  borderConfig,
  style: additionalStyle,
  canMoveStyles = {},
  crossColor,
  onClick,
}) => {
  const classes = useStyles(styles, { color: crossColor });

  return (
    <div
      className={classes.cell}
      style={{ ...borderConfig, ...additionalStyle }}
      onClick={onClick}
    >
      <div style={canMoveStyles}>
        {Boolean(crossColor) && <ClearIcon className={classes.cross} />}
      </div>
    </div>
  );
};

export default SellComponent;
