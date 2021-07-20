import React from "react";
import Paper from "@material-ui/core/Paper";

import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";
import styles from "../styles/InfoStyles";

interface InfoComponentProps {
  onMenu: () => void;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ onMenu }) => {
  const classeses = useStyles(styles);

  return (
    <Paper className={classeses.container}>
      <Button label={"TO MENU"} onClick={onMenu} />
    </Paper>
  );
};

export default InfoComponent;
