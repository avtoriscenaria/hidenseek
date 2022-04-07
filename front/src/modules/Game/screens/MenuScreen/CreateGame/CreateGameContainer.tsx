import React from "react";

import { Button } from "common/components";
import { useStyles, useTranslations } from "common/hooks";
import { getPlayer } from "common/selectors";
import { useAppSelector } from "redux/hooks";
import { useSocketContext } from "SocketContext";

import styles from "./styles";

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
