import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GamePlayerDocument = GamePlayer & Document;

@Schema()
export class GamePlayer {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  position: { x: number; y: number };

  @Prop()
  creator: boolean;

  @Prop()
  hunter: boolean;

  @Prop()
  caught: boolean;
}

export const GameSchema = SchemaFactory.createForClass(GamePlayer);
