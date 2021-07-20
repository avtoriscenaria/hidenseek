import React from "react";

import useTranslations from "common/hooks/useTranslations";

import CreateGameComponent from "../components/CreateGameComponent";
import { useGameCreateRequest } from "../hooks";

const CreateGameContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const { request } = useGameCreateRequest();

  const onCreateGame = () => request({ playerID: "check" });

  return (
    <CreateGameComponent
      translations={gameTranslations}
      onCreateGame={onCreateGame}
    />
  );
};

export default CreateGameContainer;
