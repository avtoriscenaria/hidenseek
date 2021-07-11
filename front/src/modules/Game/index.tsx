import React, { useEffect } from "react";

import useStyles from "common/hooks/useStyles";
// import useApiRequest from "common/hooks/useApiRequest";
// import { API } from "constants/api";

import Desk from "./Desk/containers/DeskContainer";
import Info from "./Info/containers/InfoContainer";
import styles from "./styles";

const Game: React.FC = () => {
  const classes = useStyles(styles);
  //const { api } = useApiRequest();
  const getGame = async () => {
    // let res = await api(API.game.getGame.uri, API.game.getGame.method);
    // console.log("res", res);
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div className={classes.container}>
      <Desk />
      <Info />
    </div>
  );
};

export default Game;
