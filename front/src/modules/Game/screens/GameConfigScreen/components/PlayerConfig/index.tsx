import { GamePlayer } from "common/interfaces/Game";

import PlayerConfig from "./PlayerConfig";

interface PlayerConfigProps {
  player: GamePlayer;
  isMyPlayerCreator: boolean;
  setHunter: (value: boolean, id: string) => void;
}

export default function PlayerConfigContainer({
  player,
  isMyPlayerCreator,
  setHunter,
}: PlayerConfigProps) {
  return (
    <PlayerConfig
      player={player}
      setHunter={setHunter}
      isMyPlayerCreator={isMyPlayerCreator}
    />
  );
}
