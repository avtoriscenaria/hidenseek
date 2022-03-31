import { IGamePlayer } from "common/interfaces/Game";

export const configurateSell = (
  _id: string,
  players: IGamePlayer[],
  coordinates: { x: number; y: number },
  sell: { x?: number; y?: number },
  playerPosition: string,
  canMoveColor: string,
  canCatch: boolean,
  isHideCell: boolean,
  canPlayerMove: boolean,
  setPlayerPosition: (position: string) => void,
  setCanMoveColor: (value: string) => void,
  setCanCatch: (value: boolean) => void,
  setIsHideCell: (value: boolean) => void
) => {
  const { x, y } = coordinates;
  const { x: xBlock, y: yBlock } = sell;

  const player = players.find(
    (player: {
      color: string;
      position: { x?: number; y?: number };
      hunter?: boolean;
      caught?: boolean;
      leave?: boolean;
    }) => !player.caught && !player.leave && player.position.x === x && player.position.y === y
  );

  if (player && player.color !== playerPosition) {
    setPlayerPosition(player.color);
  } else if (player === undefined && playerPosition !== "") {
    setPlayerPosition("");
  }

  const myPlayer = players.find(
    (player: { _id: string }) => player._id === _id
  );

  if (myPlayer && !myPlayer.caught && !myPlayer.leave) {
    const {
      position: { x: X, y: Y },
      hunter,
    } = myPlayer;

    if (
      canPlayerMove &&
      ((Y === y &&
        ((X === x + 1 && xBlock !== 1 && xBlock !== 2) ||
          (X === x - 1 && xBlock !== 0 && xBlock !== 2))) ||
        (X === x &&
          ((Y === y + 1 && yBlock !== 0 && yBlock !== 2) ||
            (Y === y - 1 && yBlock !== 1 && yBlock !== 2))))
    ) {
      if (
        players.some(
          (p) => !p.caught && !p.leave && p.position.y === y && p.position.x === x
        )
      ) {
        if (hunter && !canCatch) {
          setCanCatch(true);
          setCanMoveColor(myPlayer.color);
        } else if (!hunter && canMoveColor) {
          setCanMoveColor("");
        }
      } else {
        setCanMoveColor(myPlayer.color);
        if (canCatch) {
          setCanCatch(false);
        }
      }
    } else {
      setCanMoveColor("");
      setCanCatch(false);
    }

    if (Boolean(hunter)) {
      const show =
        (y === Y && (x === X - 1 || x === X + 1)) ||
        (x === X && (y === Y + 1 || y === Y - 1)) ||
        (x === X - 1 && y === Y + 1) ||
        (x === X + 1 && y === Y + 1) ||
        (x === X + 1 && y === Y - 1) ||
        (x === X - 1 && y === Y - 1) ||
        (x === X && y === Y);

      if (show === isHideCell) {
        setIsHideCell(!show);
      }
    }
  }
};
