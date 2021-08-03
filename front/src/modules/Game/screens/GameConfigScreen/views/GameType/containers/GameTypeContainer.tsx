import React from "react";

import GameTypeComponent from "../components/GameTypeComponent";
import useTranslations from "common/hooks/useTranslations";

const GameTypeContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();

  return <GameTypeComponent translations={gameTranslations} />;
};

export default GameTypeContainer;
