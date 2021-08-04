import { GamePlayer } from "common/interfaces/Game";

export const configurateSell = (
  _id: string,
  players: GamePlayer[],
  coordinates: { x: number; y: number },
  sell: { x?: number; y?: number },
  canMoveColor: string,
  playerPosition: string,
  setPlayerPosition: (position: string) => void,
  setCanMoveColor: (value: string) => void
) => {
  const { x, y } = coordinates;
  const { x: xBlock, y: yBlock } = sell;

  const player = players.find(
    (player: {
      color: string;
      position: { x?: number; y?: number };
      hunter?: boolean;
    }) => player.position.x === x && player.position.y === y
  );

  if (player && player.color !== playerPosition) {
    setPlayerPosition(player.color);
  } else if (player === undefined && playerPosition !== "") {
    setPlayerPosition("");
  }

  const myPlayer = players.find(
    (player: { _id: string }) => player._id === _id
  );

  if (myPlayer) {
    const {
      position: { x: X, y: Y },
    } = myPlayer;

    if (
      (Y === y &&
        ((X === x + 1 && xBlock !== 1 && xBlock !== 2) ||
          (X === x - 1 && xBlock !== 0 && xBlock !== 2))) ||
      (X === x &&
        ((Y === y + 1 && yBlock !== 1 && yBlock !== 2) ||
          (Y === y - 1 && yBlock !== 0 && yBlock !== 2)))
    ) {
      setCanMoveColor(myPlayer.color);
    } else {
      setCanMoveColor("");
    }
  }
};
