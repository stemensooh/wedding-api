import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParametroDocument = HydratedDocument<Parametro>;

@Schema()
export class Parametro {
  _id: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const ParametroSchema = SchemaFactory.createForClass(Parametro);
