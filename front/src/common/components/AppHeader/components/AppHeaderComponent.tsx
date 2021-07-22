import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useStyles from "common/hooks/useStyles";
import styles from "../styles";

interface AppHeaderProps {
  isAuthorized: boolean;
  disableTitleNavigation: boolean;
  handleGame: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function AppHeader({
  isAuthorized,
  disableTitleNavigation,
  handleGame,
  handleMenu,
}: AppHeaderProps) {
  const classes = useStyles(styles);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.titleContainer}>
            <Typography
              variant="h6"
              className={
                disableTitleNavigation
                  ? classes.notAuthorizedTitle
                  : classes.title
              }
              onClick={handleGame}
            >
              Hide & Seek
            </Typography>
          </div>

          {!isAuthorized ? null : (
            <div>
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
