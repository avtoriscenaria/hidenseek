import React from "react";

import copyText from "common/utils/copyText";
import { useSocketContext } from "contexts/Socket/SocketContext";

import PlayersConfigComponent from "../components/PlayersConfigComponent";
import useTranslations from "common/hooks/useTranslations";

const PlayersConfigContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const { game } = useSocketContext();

  const setHunter = (value: boolean) => {
    console.log(value);
  };

  return (
    <PlayersConfigComponent
      gameKey={game?._id}
      players={game?.players}
      translations={gameTranslations}
      copyKey={copyText}
      setHunter={setHunter}
    />
  );
};

export default PlayersConfigContainer;
