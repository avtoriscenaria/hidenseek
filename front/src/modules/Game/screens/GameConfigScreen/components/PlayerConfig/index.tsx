import { GamePlayer } from "common/interfaces/Game";

import PlayerConfig from "./PlayerConfig";

interface PlayerConfigProps {
  player: GamePlayer;
  setHunter: (value: boolean) => void;
}

export default function PlayerConfigContainer({
  player,
  setHunter,
}: PlayerConfigProps) {
  return <PlayerConfig player={player} setHunter={setHunter} />;
}
