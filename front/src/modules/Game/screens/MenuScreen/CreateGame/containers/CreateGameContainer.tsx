import React from "react";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

import CreateGameComponent from "../components/CreateGameComponent";
import { useGameCreateRequest } from "../hooks";

const CreateGameContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const { player: { nickname, _id } = {} } = useAppLayoutContext();
  const { request } = useGameCreateRequest();

  const onCreateGame = () => {
    request({ nickname, _id });
  };

  return (
    <CreateGameComponent
      translations={gameTranslations}
      onCreateGame={onCreateGame}
    />
  );
};

export default CreateGameContainer;
