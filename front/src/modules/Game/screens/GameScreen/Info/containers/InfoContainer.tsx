import ROUTES from "constants/routes";
import React from "react";
import { useHistory } from "react-router-dom";

import InfoComponent from "../components/InfoComponent";
import { useExitGameRequest } from "../hooks";

const DeskContainer: React.FC = () => {
  const history = useHistory();

  const { request } = useExitGameRequest();

  const exitGame = () => request();
  const onMenu = () => history.push(ROUTES.game.menu);

  return <InfoComponent onMenu={onMenu} exitGame={exitGame} />;
};

export default DeskContainer;
