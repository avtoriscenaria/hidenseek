import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  admin?: boolean;

  @Prop()
  game_id: string;

  @Prop({ default: [] })
  games_played: string[];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
