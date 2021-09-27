import React from "react";

import useTranslations from "common/hooks/useTranslations";
import copyText from "common/utils/copyText";
import { useSocketContext } from "contexts/Socket/SocketContext";

import PlayersConfigComponent from "../components/PlayersConfigComponent";
import { setHunterRoleSocket } from "contexts/Socket/helpers/SocketIo";

const PlayersConfigContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const { game } = useSocketContext();

  const setHunter = (value: boolean) => {
    console.log(value);
    if (value) {
      setHunterRoleSocket();
    }
  };

  return (
    <PlayersConfigComponent
      gameKey={game?.gameKey}
      players={game?.players}
      translations={gameTranslations}
      copyKey={copyText}
      setHunter={setHunter}
    />
  );
};

export default PlayersConfigContainer;
