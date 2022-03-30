import React from "react";

import Paper from "@material-ui/core/Paper";
import useTranslations from "common/hooks/useTranslations";
// import ROUTES from "constants/routes";
//import { useSocketContext } from "contexts/Socket/SocketContext";
// import { useHistory } from "react-router-dom";

import { useExitGameRequest } from "./hooks";

import { IGamePlayer } from "common/interfaces/Game";
import useStyles from "common/hooks/useStyles";
import Button from "common/components/Button";

import Player from "./components/PlayerComponent";
import styles from "./styles/InfoStyles";
import { IInfoTranslations } from "./interfaces";
import { useAppSelector } from "redux/hooks";
import { getGame, getMyGamePlayer } from "common/selectors";
import { useSocketContext } from "SocketContext/SocketContext";

const DeskContainer: React.FC = () => {
  // const history = useHistory();
  //const { game = { players: [] }, myGamePlayer } = useSocketContext();
  const { game: translations } = useTranslations();
  //const { request } = useExitGameRequest();
  const { players } = useAppSelector(getGame);
  const myGamePlayer = useAppSelector(getMyGamePlayer);
  const { leaveGameSocket} = useSocketContext()

  const exitGame = () => leaveGameSocket();
  const onMenu = () => {}; //history.push(ROUTES.game.menu);

  // return (
  //   <InfoComponent
  //     myGamePlayerId={myGamePlayer?._id}
  //     onMenu={onMenu}
  //     exitGame={exitGame}
  //     players={game?.players}
  //     translations={gameTranslations}
  //   />
  // );

  const classeses = useStyles(styles);

  return (
    <Paper className={classeses.container}>
      {players.map((p: any) => (
        <Player
          key={p._id}
          player={p}
          translations={translations}
          isMyGamePlayer={myGamePlayer._id === p._id}
        />
      ))}
      <div className={classeses.buttonsWrapper}>
        {/* <Button label={translations.toMenu} onClick={onMenu} /> */}
        <Button
          label={translations.exitGame}
          type="secondary"
          onClick={exitGame}
        />
      </div>
    </Paper>
  );
};

export default DeskContainer;
