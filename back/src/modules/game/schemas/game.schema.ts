import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { GamePlayer } from './gamePlayer.schema';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  hide: boolean;

  @Prop({ required: true })
  players: GamePlayer[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
