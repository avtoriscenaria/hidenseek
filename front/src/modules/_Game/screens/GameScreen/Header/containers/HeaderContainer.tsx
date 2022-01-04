import React, { useEffect, useState } from "react";

import { useSocketContext } from "contexts/Socket/SocketContext";
import useTranslations from "common/hooks/useTranslations";
import { endTurn as endTurnSocket } from "contexts/Socket/helpers/SocketIo";

import HeaderComponent from "../components/HeaderComponent";

const HeaderContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const {
    timer,

    myGamePlayer,
    game: { hide, players } = { hide: false, players: [] },
  } = useSocketContext();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(Boolean(myGamePlayer?.hunter) === hide);
  }, [hide, myGamePlayer?.hunter]);

  const endTurn = () => {
    setDisabled(true);
    endTurnSocket();
  };

  const isDisabled =
    disabled ||
    players.some((p) => p.won) ||
    Boolean(myGamePlayer?.hunter) === hide;

  return (
    <HeaderComponent
      endTurn={endTurn}
      timer={timer}
      step={myGamePlayer?.step}
      translations={gameTranslations}
      disableButton={isDisabled}
    />
  );
};

export default HeaderContainer;
