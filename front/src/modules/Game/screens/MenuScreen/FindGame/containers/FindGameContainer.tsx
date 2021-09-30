import React, { useState, ChangeEvent } from "react";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
//import { findGameSocket } from "contexts/Socket/helpers/SocketIo";

import FindGameComponent from "../components/FindGameComponent";
// import { useSocketContext } from "contexts/Socket/SocketContext";
import { useFindGameRequest } from "../hooks";

const FindGameContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const { player } = useAppLayoutContext();
  // const { token } = useSocketContext();
  const [isFindByKey, setIsFindByKey] = useState(false);
  const [gameKey, setGameKey] = useState("");
  const { request } = useFindGameRequest();

  const onFind = () => {
    request({
      gameKey,
      player_id: player?._id,
    });
    // findGameSocket(token, {
    //   gameKey,
    //   player_id: player?._id,
    // });
  };

  const onChangeGameKey = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGameKey(value);
  };

  return (
    <FindGameComponent
      translations={gameTranslations}
      gameKey={gameKey}
      isFindByKey={isFindByKey}
      onFindByKey={() => setIsFindByKey(!isFindByKey)}
      onChangeGameKey={onChangeGameKey}
      onFind={onFind}
    />
  );
};

export default FindGameContainer;
