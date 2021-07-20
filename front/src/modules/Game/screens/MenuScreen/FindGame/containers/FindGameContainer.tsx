import React, { useState, ChangeEvent } from "react";

import useTranslations from "common/hooks/useTranslations";

import FindGameComponent from "../components/FindGameComponent";

const FindGameContainer: React.FC = () => {
  const { game: gameTranslations } = useTranslations();
  const [isFindByKey, setIsFindByKey] = useState(false);
  const [gameKey, setGameKey] = useState("");

  const onFind = () => {};
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
