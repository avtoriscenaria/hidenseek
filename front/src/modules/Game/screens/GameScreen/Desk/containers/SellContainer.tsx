import React, { memo, useState } from "react";

import { useSocketContext } from "contexts/SocketContext";

import SellComponent from "../components/SellComponent";
import { SellConfig } from "../interfaces";
import { useBorderConfig } from "../hooks";
import { GamePlayer } from "common/interfaces/Game";
import { useEffect } from "react";

const defaultGame = {
  players: [{ color: "red", position: {} }],
};

interface SellContainerProps {
  config: SellConfig;
  style: Object;
  coordinates: { x: number; y: number };
}

const SellContainer: React.FC<SellContainerProps> = memo(
  ({ config: sell, coordinates: { x, y }, style }) => {
    const { socket, game = defaultGame } = useSocketContext();
    const [playerPosition, setPlayerPosition] = useState("");
    const { border } = useBorderConfig(sell);
    const { players } = game;

    useEffect(() => {
      const player = players.find(
        (player: {
          color: string;
          position: { x?: number; y?: number };
          hunter?: boolean;
        }) => player.position.x === x && player.position.y === y
      );

      if (player && player.color !== playerPosition) {
        setPlayerPosition("red");
      } else if (player === undefined && playerPosition !== "") {
        setPlayerPosition("");
      }
    }, [players]);

    const move = () => {
      //socket.emit("move", { message: "move" });
      console.log("MOVE", { x, y });
    };

    return (
      <SellComponent
        borderConfig={border}
        onClick={move}
        style={{ ...style, backgroundColor: playerPosition }}
      />
    );
  }
);

export default SellContainer;
