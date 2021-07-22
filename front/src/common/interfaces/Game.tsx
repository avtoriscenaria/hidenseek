export interface Game {
  hide: boolean;
  status: string;
  players: GamePlayer[];
}

export interface GamePlayer {
  nickname: string;
  _id: string;
  creator?: boolean;
  hunter?: boolean;
  cached?: boolean;
}
