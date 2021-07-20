import React, { ChangeEvent } from "react";

import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";
import Input from "common/components/Input";

import styles from "../styles";

interface FindGameComponentProps {
  translations: any;
  gameKey?: string;
  isFindByKey: boolean;
  onFind: () => void;
  onFindByKey: () => void;
  onChangeGameKey: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const FindGameComponent: React.FC<FindGameComponentProps> = ({
  translations,
  gameKey,
  isFindByKey,
  onFind,
  onFindByKey,
  onChangeGameKey,
}) => {
  const classes = useStyles(styles);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{translations.findGameTitle}</div>
      <Button
        classes={classes.findButton}
        label={translations.find}
        onClick={onFind}
      />
      <div className={classes.findByKeyContainer}>
        <div className={classes.findByKeyLabel} onClick={onFindByKey}>
          {translations.findByKey}
        </div>
        {isFindByKey && (
          <Input
            classes={classes.keyInput}
            label={translations.gameKey}
            placeholder={translations.enterTheKey}
            name="gameKey"
            value={gameKey}
            onChange={onChangeGameKey}
          />
        )}
      </div>
    </div>
  );
};

export default FindGameComponent;
