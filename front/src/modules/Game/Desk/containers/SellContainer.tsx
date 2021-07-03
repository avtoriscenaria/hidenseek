import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import SellComponent from "../components/SellComponent";
import { SellConfig, SellBorder } from "../interfaces";

interface SellContainerProps {
  config: SellConfig;
  style: Object;
}

const SellContainer: React.FC<SellContainerProps> = ({
  config: sell,
  style,
}) => {
  const [border, setBorder] = useState({});
  const move = () => {
    console.log("MOVE");
  };

  useEffect(() => {
    makeBorders();
  }, []);

  const makeBorders = () => {
    let border: SellBorder = {};

    if (sell.y !== undefined) {
      border.borderTopColor =
        sell.y === 0 || sell.y === 2 ? "black" : undefined;
      border.borderBottomColor =
        sell.y === 1 || sell.y === 2 ? "black" : undefined;
    }

    if (sell.x !== undefined) {
      border.borderLeftColor =
        sell.x === 0 || sell.x === 2 ? "black" : undefined;
      border.borderRightColor =
        sell.x === 1 || sell.x === 2 ? "black" : undefined;
    }

    setBorder(border);
  };

  return <SellComponent borderConfig={border} onClick={move} style={style} />;
};

export default SellContainer;
