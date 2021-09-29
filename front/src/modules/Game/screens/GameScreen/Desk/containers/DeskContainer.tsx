import React from "react";

import useTranslations from "common/hooks/useTranslations";
import { useSocketContext } from "contexts/Socket/SocketContext";

import DeskComponent from "../components/DeskComponent";

const DeskContainer: React.FC = () => {
  const { game } = useTranslations();
  const { myGamePlayer: { caught, won } = { caught: false, won: false } } =
    useSocketContext();

  const modalDescription = Boolean(caught)
    ? game.caught
    : Boolean(won)
    ? game.won
    : "";

  return (
    <DeskComponent
      caught={Boolean(caught)}
      won={Boolean(won)}
      modalDescription={modalDescription}
    />
  );
};

export default DeskContainer;
