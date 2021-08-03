import React, { memo, useState, useEffect } from "react";

import { GamePlayer } from "common/interfaces/Game";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import { useSocketContext } from "contexts/Socket/SocketContext";

import SellComponent from "../components/SellComponent";
import { SellConfig } from "../interfaces";
import { useBorderConfig } from "../hooks";
import { configurateSell } from "../utils";

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
    const { socket, game = defaultGame } = useSocketContext();
    const [playerPosition, setPlayerPosition] = useState("");
    const [canMove, setCanMove] = useState(false);
    const { border } = useBorderConfig(sell);
    const { players } = game;

    useEffect(() => {
      configurateSell(
        _id,
        players,
        coordinates,
        sell,
        canMove,
        playerPosition,
        setPlayerPosition,
        setCanMove
      );
    }, [_id, canMove, coordinates, playerPosition, players, sell]);

    const move = () => {
      //socket.emit("move", { message: "move" });
      console.log("MOVE", coordinates);
    };

    return (
      <SellComponent
        borderConfig={border}
        onClick={move}
        style={{
          ...style,
          backgroundColor: playerPosition || (canMove && "grey"),
        }}
      />
    );
  }
);

export default SellContainer;
