export interface Game {
  hide: boolean;
  status: string;
  players: GamePlayer[];
  _id: string;
}

export interface GamePlayer {
  nickname: string;
  _id: string;
  creator?: boolean;
  hunter?: boolean;
  cached?: boolean;
  color: string;
  position: { x: number; y: number };
}
