import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WeddingDocument = HydratedDocument<Wedding>;

@Schema()
export class Wedding {
  _id: string;

  @Prop()
  fecha: Date;

  @Prop()
  resumen: string;

  @Prop()
  mensaje: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding);
