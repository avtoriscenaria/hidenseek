import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { GamePlayer } from './gamePlayer.schema';

export type GameDocument = Game & Document;

class SettingsProps {
  hunterStep: number;
  preyStep: number;
}

@Schema()
export class Game {
  @Prop()
  status: string;

  @Prop()
  hide: boolean;

  @Prop()
  settings: SettingsProps;

  @Prop()
  gameKey: string;

  @Prop()
  players: GamePlayer[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
