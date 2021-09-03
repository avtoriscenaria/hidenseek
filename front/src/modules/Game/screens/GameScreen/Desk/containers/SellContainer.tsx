import React, { memo, useState, useEffect } from "react";

import { GamePlayer } from "common/interfaces/Game";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import { useSocketContext } from "contexts/Socket/SocketContext";

import SellComponent from "../components/SellComponent";
import { SellConfig } from "../interfaces";
import { useBorderConfig } from "../hooks";
import { configurateSell } from "../utils";

import { movePlayerSocket } from "contexts/Socket/helpers/SocketIo";

const defaultGame = {
  players: [],
};

interface SellContainerProps {
  config: SellConfig;
  style: Object;
  coordinates: { x: number; y: number };
}

const SellContainer: React.FC<SellContainerProps> = memo(
  ({ config: sell, coordinates, style }) => {
    const { player: { _id } = { _id: "" } } = useAppLayoutContext();
    const { game = defaultGame } = useSocketContext();
    const [playerPosition, setPlayerPosition] = useState("");
    const [canMoveColor, setCanMoveColor] = useState("");
    const { border } = useBorderConfig(sell);
    const { players } = game;

    useEffect(() => {
      configurateSell(
        _id,
        players,
        coordinates,
        sell,
        canMoveColor,
        playerPosition,
        setPlayerPosition,
        setCanMoveColor
      );
    }, [_id, canMoveColor, coordinates, playerPosition, players, sell]);

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
          backgroundColor: playerPosition,
        }}
        canMoveStyles={
          !Boolean(canMoveColor)
            ? undefined
            : {
                backgroundColor: canMoveColor,
                opacity: 0.1,
                height: "100%",
              }
        }
      />
    );
  }
);

export default SellContainer;
