import React, { memo, useState, useEffect } from "react";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import { useSocketContext } from "contexts/Socket/SocketContext";
import { movePlayerSocket } from "contexts/Socket/helpers/SocketIo";

import SellComponent from "../components/SellComponent";
import { ISellConfig } from "../interfaces";
import { useBorderConfig } from "../hooks";
import { configurateSell } from "../utils";

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
    const { player: { _id } = { _id: "" } } = useAppLayoutContext();
    const { game = defaultGame, myGamePlayer = { step: 0, hunter: false } } =
      useSocketContext();
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
        movePlayerSocket("move", coordinates);
      }
    };

    return (
      <SellComponent
        borderConfig={border}
        onClick={move}
        style={{
          ...style,
          cursor: Boolean(canMoveColor) ? "pointer" : undefined,
          backgroundColor: isHideCell ? "grey" : playerPosition,
        }}
        canMoveStyles={
          !Boolean(canMoveColor) || canCatch || isHideCell
            ? undefined
            : {
                backgroundColor: canMoveColor,
                opacity: 0.1,
                height: "100%",
              }
        }
        crossColor={canCatch ? canMoveColor : undefined}
      />
    );
  }
);

export default SellContainer;
