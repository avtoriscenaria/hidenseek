import React, { memo, useState, useEffect } from "react";

import { useAppLayoutContext } from "contexts/AppLayoutContext";
import { useSocketContext } from "contexts/Socket/SocketContext";
import { movePlayerSocket } from "contexts/Socket/helpers/SocketIo";

// import SellComponent from "../components/SellComponent";
// import { ISellConfig } from "../interfaces";
// import { useBorderConfig } from "../hooks";
// import { configurateSell } from "../utils";

const defaultGame = {
  players: [],
  hide: false,
};

interface ISellContainer {
  config: any; //ISellConfig;
  style: Object;
  coordinates: { x: number; y: number };
}

const Сell: React.FC<ISellContainer> = memo(
  ({ config: sell, coordinates, style }) => {
    const { player: { _id } = { _id: "" } } = useAppLayoutContext();
    const { game = defaultGame, myGamePlayer = { step: 0, hunter: false } } =
      useSocketContext();
    const [playerPosition, setPlayerPosition] = useState("");
    const [canMoveColor, setCanMoveColor] = useState("");
    const [canCatch, setCanCatch] = useState(false);
    const [isHideCell, setIsHideCell] = useState(Boolean(myGamePlayer.hunter));
    // const { border } = useBorderConfig(sell);
    const { players, hide: isHideRound } = game;
    const canPlayerMove =
      Boolean(isHideRound) !== Boolean(myGamePlayer.hunter) &&
      myGamePlayer.step > 0;

    // useEffect(() => {
    //   configurateSell(
    //     _id,
    //     players,
    //     coordinates,
    //     sell,
    //     playerPosition,
    //     canMoveColor,
    //     canCatch,
    //     isHideCell,
    //     canPlayerMove,
    //     setPlayerPosition,
    //     setCanMoveColor,
    //     setCanCatch,
    //     setIsHideCell
    //   );
    // }, [
    //   _id,
    //   canCatch,
    //   canMoveColor,
    //   canPlayerMove,
    //   coordinates,
    //   isHideCell,
    //   playerPosition,
    //   players,
    //   sell,
    // ]);

    const move = () => {
      if (Boolean(canMoveColor)) {
        movePlayerSocket("move", coordinates);
      }
    };

    // const classes = useStyles(styles, { color: crossColor });

    return (
      <div
      // className={classes.cell}
      // style={{ ...borderConfig, ...additionalStyle }}
      // onClick={onClick}
      >
        {/* <div style={canMoveStyles}>
        {Boolean(crossColor) && <ClearIcon className={classes.cross} />}
      </div> */}
      </div>
    );
  }
);

export default Сell;
