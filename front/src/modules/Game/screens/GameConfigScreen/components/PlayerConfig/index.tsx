import PlayerConfig from "./PlayerConfig";
import { IPlayerConfig } from "../../interfaces";

export default function PlayerConfigContainer({
  player,
  isMyPlayerCreator,
  setHunter,
}: IPlayerConfig) {
  return (
    <PlayerConfig
      player={player}
      setHunter={setHunter}
      isMyPlayerCreator={isMyPlayerCreator}
    />
  );
}
