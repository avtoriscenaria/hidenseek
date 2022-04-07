import React from "react";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import { useStyles, useTranslations } from "common/hooks";

import CreateGame from "./CreateGame";
import FindGame from "./FindGame";
import styles from "./styles";

const MenuScreen: React.FC = () => {
  const classes = useStyles(styles);

  const { game: gameTranslations } = useTranslations();

  return (
    <div className={classes.container}>
      <Paper className={classes.wrapper}>
        <div className={classes.title}>{gameTranslations.menu}</div>
        <div className={classes.menuActions}>
          <FindGame />

          <div className={classes.dividerContainer}>
            <Divider className={classes.divider} orientation="vertical" />
          </div>

          <CreateGame />
        </div>
      </Paper>
    </div>
  );
};

export default MenuScreen;
