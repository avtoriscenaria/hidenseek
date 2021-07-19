import { SellBorder, SellConfig } from "../interfaces";

export const useBorderConfig = (sell: SellConfig) => {
  const border: SellBorder = {};
  console.log("UPDATE");
  if (sell.y !== undefined) {
    border.borderTopColor = sell.y === 0 || sell.y === 2 ? "black" : undefined;
    border.borderBottomColor =
      sell.y === 1 || sell.y === 2 ? "black" : undefined;
  }

  if (sell.x !== undefined) {
    border.borderLeftColor = sell.x === 0 || sell.x === 2 ? "black" : undefined;
    border.borderRightColor =
      sell.x === 1 || sell.x === 2 ? "black" : undefined;
  }

  return { border };
};
