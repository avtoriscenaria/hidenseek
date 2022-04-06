import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useStyles from "common/hooks/useStyles";
import { getIsAuthorised } from "common/selectors";
import useTranslations from "common/hooks/useTranslations";
import { getPlayer } from "common/selectors";
import ROUTES from "constants/routes";

import styles from "./styles";

export default function AppHeaderContainer() {
  const history = useHistory();
  const { main: translations } = useTranslations();
  const { nickname } = useAppSelector(getPlayer);
  const isAuthorized = useAppSelector(getIsAuthorised);
  const classes = useStyles(styles);

  const handleGame = () => {
    if (isAuthorized) {
      history.push(ROUTES.game.base);
    }
  };

  const handleMenu = () => {
    history.push(ROUTES.account.base);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.titleContainer}>
            <Typography
              variant="h6"
              className={
                isAuthorized ? classes.title : classes.notAuthorizedTitle
              }
              onClick={handleGame}
            >
              {translations.gameName}
            </Typography>
          </div>

          {!isAuthorized ? null : (
            <div className={classes.pannel}>
              <div className={classes.userName}>{nickname}</div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
