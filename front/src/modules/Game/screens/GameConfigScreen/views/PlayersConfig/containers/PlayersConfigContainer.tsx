import React from "react";

import { setHunterRoleSocket } from "contexts/Socket/helpers/SocketIo";
import useTranslations from "common/hooks/useTranslations";
import copyText from "common/utils/copyText";
import { useSocketContext } from "contexts/Socket/SocketContext";

import PlayersConfigComponent from "../components/PlayersConfigComponent";

const PlayersConfigContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const { game, myGamePlayer } = useSocketContext();

  const setHunter = (value: boolean, id: string) => {
    if (value && id) {
      setHunterRoleSocket(id);
    }
  };

  return (
    <PlayersConfigComponent
      gameKey={game?.gameKey}
      players={game?.players}
      isMyPlayerCreator={Boolean(myGamePlayer?.creator)}
      translations={gameTranslations}
      copyKey={copyText}
      setHunter={setHunter}
    />
  );
};

export default PlayersConfigContainer;
