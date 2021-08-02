import React from "react";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import ROUTES from "constants/routes";
import useStyles from "common/hooks/useStyles";

import PlayersConfig from "./PlayersConfig";
import styles from "./styles";

const GameConfigScreen: React.FC = () => {
  const classes = useStyles(styles);
  const { hasGame } = useAppLayoutContext();

  return !hasGame ? (
    <Redirect to={ROUTES.game.menu} />
  ) : (
    <div className={classes.container}>
      <Paper className={classes.wrapper}>
        <div className={classes.menuActions}>
          <div className={classes.dividerContainer}>
            <Divider className={classes.divider} orientation="vertical" />
          </div>

          <PlayersConfig />
        </div>
      </Paper>
    </div>
  );
};

export default GameConfigScreen;
