import React from "react";

import { useSocketContext } from "contexts/Socket/SocketContext";
import useTranslations from "common/hooks/useTranslations";

import HeaderComponent from "../components/HeaderComponent";

const HeaderContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const {
    timer,
    myGamePlayer,
    game: { hide, players } = { hide: false, players: [] },
  } = useSocketContext();

  const isDisabled =
    players.some((p) => p.won) || Boolean(myGamePlayer?.hunter) === hide;

  return (
    <HeaderComponent
      timer={timer}
      step={myGamePlayer?.step}
      translations={gameTranslations}
      disableButton={isDisabled}
    />
  );
};

export default HeaderContainer;
