import React, { useState, ChangeEvent } from "react";

import { Button, Input } from "common/components";
import { useStyles, useTranslations } from "common/hooks";
import { getPlayer } from "common/selectors";
import { useAppSelector } from "redux/hooks";
import { useSocketContext } from "SocketContext";

import styles from "./styles";

const FindGameContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  const { connectToGame } = useSocketContext();
  const { _id: player_id } = useAppSelector(getPlayer);
  const [isFindByKey, setIsFindByKey] = useState(false);
  const [gameKey, setGameKey] = useState("");

  const onFind = () => {
    connectToGame(false, player_id, isFindByKey ? gameKey : undefined);
  };

  const onChangeGameKey = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGameKey(value);
  };

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
        <div
          className={classes.findByKeyLabel}
          onClick={() => setIsFindByKey(!isFindByKey)}
        >
          {translations.findByKey}
        </div>
        <Input
          classes={isFindByKey ? "" : classes.keyInput}
          label={translations.gameKey}
          placeholder={translations.enterTheKey}
          name="gameKey"
          value={gameKey}
          onChange={onChangeGameKey}
        />
      </div>
    </div>
  );
};

export default FindGameContainer;
