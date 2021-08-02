import React from "react";

import { useSocketContext } from "contexts/SocketContext";

import PlayersConfigComponent from "../components/PlayersConfigComponent";

const PlayersConfigContainer: React.FC = () => {
  const { game } = useSocketContext();

  console.log("GAME", game);

  return <PlayersConfigComponent />;
};

export default PlayersConfigContainer;
