import useTranslations from "common/hooks/useTranslations";
// import ROUTES from "constants/routes";
import { useSocketContext } from "contexts/Socket/SocketContext";
import React from "react";
// import { useHistory } from "react-router-dom";

import InfoComponent from "../components/InfoComponent";
import { useExitGameRequest } from "../hooks";

const DeskContainer: React.FC = () => {
  // const history = useHistory();
  const { game = { players: [] }, myGamePlayer } = useSocketContext();
  const { game: gameTranslations } = useTranslations();
  const { request } = useExitGameRequest();

  const exitGame = () => request();
  const onMenu = () => {}; //history.push(ROUTES.game.menu);

  return (
    <InfoComponent
      myGamePlayerId={myGamePlayer?._id}
      onMenu={onMenu}
      exitGame={exitGame}
      players={game?.players}
      translations={gameTranslations}
    />
  );
};

export default DeskContainer;
