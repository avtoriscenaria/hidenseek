import { IGamePlayer } from "common/interfaces/Game";

export interface IPlayerConfig {
  player: IGamePlayer;
  isMyPlayerCreator: boolean;
  setHunter: (value: boolean, id: string) => void;
}

export interface IPlayersConfigTranslations {
  gameKey: string;
  playerColor: string;
  nickname: string;
  hunter: string;
}
