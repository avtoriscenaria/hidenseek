import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useStyles from "common/hooks/useStyles";
import styles from "./styles";

export default function AppHeader() {
  const classes = useStyles(styles);

  const handleGame = (event: React.MouseEvent<HTMLElement>) => {
    console.log("Open Game");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("Open Account");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.titleContainer}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={handleGame}
            >
              Hide & Seek
            </Typography>
          </div>

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
        </Toolbar>
      </AppBar>
    </div>
  );
}
