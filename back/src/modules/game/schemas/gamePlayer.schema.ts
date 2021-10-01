import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GamePlayerDocument = GamePlayer & Document;

@Schema()
export class GamePlayer {
  @Prop()
  nickname: string;

  @Prop()
  _id: string;

  @Prop()
  color: string;

  @Prop()
  position: { x: number; y: number };

  @Prop()
  step: number;

  @Prop()
  creator: boolean;

  @Prop()
  online: boolean;

  @Prop()
  hunter: boolean;

  @Prop()
  caught: boolean;

  @Prop()
  won: boolean;
}

export const GameSchema = SchemaFactory.createForClass(GamePlayer);
