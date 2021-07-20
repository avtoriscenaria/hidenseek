import ROUTES from "constants/routes";
import React from "react";
import { useHistory } from "react-router-dom";
import InfoComponent from "../components/InfoComponent";

const DeskContainer: React.FC = () => {
  const history = useHistory();

  const onMenu = () => history.push(ROUTES.game.menu);

  return <InfoComponent onMenu={onMenu} />;
};

export default DeskContainer;
