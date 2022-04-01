import React from "react";

import useTranslations from "common/hooks/useTranslations";

import { useAppSelector } from "redux/hooks";
import { getPlayer } from "common/selectors";

import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";

import styles from "./styles";
import { useSocketContext } from "SocketContext/SocketContext";

const CreateGameContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const { connectToGame } = useSocketContext();
  const { _id } = useAppSelector(getPlayer);

  const onCreateGame = () => {
    connectToGame(true, _id);
  };

  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{translations.createGameTitle}</div>
      <Button
        classes={classes.createButton}
        label={translations.create}
        onClick={onCreateGame}
      />
      <div className={classes.createDescription}>
        {translations.createGameDescription}
      </div>
    </div>
  );
};

export default CreateGameContainer;
