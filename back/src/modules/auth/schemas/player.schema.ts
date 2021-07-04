import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop()
  nickname: string;

  @Prop()
  password: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
