import { useEffect } from "react";
import { useState } from "react";
import { ISellBorder, ISellConfig } from "../interfaces";

export const useBorderConfig = (sell: ISellConfig) => {
  const [mainBorder, setMainBorder] = useState<ISellBorder>({});

  useEffect(() => {
    const border: ISellBorder = {};
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

    setMainBorder(border);
  }, [sell]);

  return { border: mainBorder };
};
