import React, { useState, ChangeEvent } from "react";

import useTranslations from "common/hooks/useTranslations";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
//import { findGameSocket } from "contexts/Socket/helpers/SocketIo";

// import { useSocketContext } from "contexts/Socket/SocketContext";
import { useFindGameRequest } from "./hooks";

import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";
import Input from "common/components/Input";

import styles from "./styles";
import { useAppSelector } from "redux/hooks";
import { getPlayer } from "common/selectors";

const FindGameContainer: React.FC = () => {
  const { game: translations } = useTranslations();
  //const { player } = useAppLayoutContext();
  // const { token } = useSocketContext();
  const { _id: player_id } = useAppSelector(getPlayer);
  const [isFindByKey, setIsFindByKey] = useState(false);
  const [gameKey, setGameKey] = useState("");
  const { request } = useFindGameRequest();

  const onFind = () => {
    request({
      gameKey,
      player_id,
    });
    // findGameSocket(token, {
    //   gameKey,
    //   player_id: player?._id,
    // });
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

export default FindGameContainer;
