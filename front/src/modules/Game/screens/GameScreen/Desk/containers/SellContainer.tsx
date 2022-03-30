import React, { memo, useState, useEffect } from "react";

//import { useAppLayoutContext } from "contexts/AppLayoutContext";
//import { useSocketContext } from "contexts/Socket/SocketContext";
// import { movePlayerSocket } from "contexts/Socket/helpers/SocketIo";

//import SellComponent from "../components/SellComponent";
import { ISellConfig } from "../interfaces";
import { useBorderConfig } from "../hooks";
import { configurateSell } from "../utils";
import { useAppSelector } from "redux/hooks";
import { getGame, getMyGamePlayer, getPlayer } from "common/selectors";

import ClearIcon from "@material-ui/icons/Clear";

import useStyles from "common/hooks/useStyles";

import { ISellBorder } from "../interfaces";
import styles from "../styles/SellStyles";
import { useSocketContext } from "SocketContext/SocketContext";

const defaultGame = {
  players: [],
  hide: false,
};

interface ISellContainer {
  config: ISellConfig;
  style: Object;
  coordinates: { x: number; y: number };
}

const SellContainer: React.FC<ISellContainer> = memo(
  ({ config: sell, coordinates, style }) => {
    const { movePlayerSocket } = useSocketContext();
    const { _id } = useAppSelector(getPlayer);
    const game = useAppSelector(getGame);
    const myGamePlayer = useAppSelector(getMyGamePlayer);

    const [playerPosition, setPlayerPosition] = useState("");
    const [canMoveColor, setCanMoveColor] = useState("");
    const [canCatch, setCanCatch] = useState(false);
    const [isHideCell, setIsHideCell] = useState(Boolean(myGamePlayer.hunter));
    const { border } = useBorderConfig(sell);
    const { players, hide: isHideRound } = game;
    const canPlayerMove =
      Boolean(isHideRound) !== Boolean(myGamePlayer.hunter) &&
      myGamePlayer.step > 0;

    useEffect(() => {
      configurateSell(
        _id,
        players,
        coordinates,
        sell,
        playerPosition,
        canMoveColor,
        canCatch,
        isHideCell,
        canPlayerMove,
        setPlayerPosition,
        setCanMoveColor,
        setCanCatch,
        setIsHideCell
      );
    }, [
      _id,
      canCatch,
      canMoveColor,
      canPlayerMove,
      coordinates,
      isHideCell,
      playerPosition,
      players,
      sell,
    ]);

    const move = () => {
      if (Boolean(canMoveColor)) {
        movePlayerSocket(coordinates);
      }
    };

    // return (
    //   <SellComponent
    //     borderConfig={border}
    //     onClick={move}
    //     style={{
    //       ...style,
    //       cursor: Boolean(canMoveColor) ? "pointer" : undefined,
    //       backgroundColor: isHideCell ? "grey" : playerPosition,
    //     }}
    //     canMoveStyles={
    //       !Boolean(canMoveColor) || canCatch || isHideCell
    //         ? undefined
    //         : {
    //             backgroundColor: canMoveColor,
    //             opacity: 0.1,
    //             height: "100%",
    //           }
    //     }
    //     crossColor={canCatch ? canMoveColor : undefined}
    //   />
    // );
    const crossColor = canCatch ? canMoveColor : undefined;
    const classes = useStyles(styles, { color: crossColor });
    const additionalStyle = {
      ...style,
      cursor: Boolean(canMoveColor) ? "pointer" : undefined,
      backgroundColor: isHideCell ? "grey" : playerPosition,
    };
    const canMoveStyles =
      !Boolean(canMoveColor) || canCatch || isHideCell
        ? undefined
        : {
            backgroundColor: canMoveColor,
            opacity: 0.1,
            height: "100%",
          };

    return (
      <div
        className={classes.cell}
        style={{ ...border, ...additionalStyle }}
        onClick={move}
      >
        <div style={canMoveStyles}>
          {Boolean(crossColor) && <ClearIcon className={classes.cross} />}
        </div>
      </div>
    );
  }
);

export default SellContainer;
