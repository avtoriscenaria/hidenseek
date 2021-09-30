import React from "react";

import Button from "common/components/Button";
import useStyles from "common/hooks/useStyles";

import styles from "../styles";

interface ICreateGameComponent {
  translations: any;
  onCreateGame: () => void;
}

const CreateGameComponent: React.FC<ICreateGameComponent> = ({
  translations,
  onCreateGame,
}) => {
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

export default CreateGameComponent;
