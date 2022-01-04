import React from "react";

import useTranslations from "common/hooks/useTranslations";

import CreateGameComponent from "../components/CreateGameComponent";
import { useGameCreateRequest } from "../hooks";
import { useAppSelector } from "redux/hooks";
import { getPlayer } from "common/selectors";

const CreateGameContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();

  const { nickname, _id } = useAppSelector(getPlayer);
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
