export interface IGame {
  hide: boolean;
  status: string;
  gameKey: string;
  players: IGamePlayer[];
  _id: string;
}

export interface IGamePlayer {
  nickname: string;
  _id: string;
  creator?: boolean;
  hunter?: boolean;
  caught?: boolean;
  leave?: boolean;
  won?: boolean;
  step: number;
  color: string;
  position: { x: number; y: number };
}
