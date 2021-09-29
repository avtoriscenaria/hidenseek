export interface Game {
  hide: boolean;
  status: string;
  gameKey: string;
  players: GamePlayer[];
  _id: string;
}

export interface GamePlayer {
  nickname: string;
  _id: string;
  creator?: boolean;
  hunter?: boolean;
  caught?: boolean;
  won?: boolean;
  step: number;
  color: string;
  position: { x: number; y: number };
}
