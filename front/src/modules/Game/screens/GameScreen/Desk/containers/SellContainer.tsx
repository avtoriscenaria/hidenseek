import React from "react";

import { useSocketContext } from "contexts/SocketContext";

import SellComponent from "../components/SellComponent";
import { SellConfig } from "../interfaces";
import { useBorderConfig } from "../hooks";

interface SellContainerProps {
  config: SellConfig;
  style: Object;
}

const SellContainer: React.FC<SellContainerProps> = ({
  config: sell,
  style,
}) => {
  const { socket } = useSocketContext();
  const { border } = useBorderConfig(sell);

  const move = () => {
    socket.emit("move", { message: "move" });
    console.log("MOVE");
  };

  return <SellComponent borderConfig={border} onClick={move} style={style} />;
};

export default SellContainer;
