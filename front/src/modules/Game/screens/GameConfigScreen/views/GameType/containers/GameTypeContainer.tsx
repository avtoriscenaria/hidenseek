import React from "react";

import useTranslations from "common/hooks/useTranslations";

import GameTypeComponent from "../components/GameTypeComponent";

const GameTypeContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();

  return <GameTypeComponent translations={gameTranslations} />;
};

export default GameTypeContainer;
