import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type EventCustomDocument = HydratedDocument<EventCustom>;

@Schema()
export class EventCustom {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding

  @Prop()
  titulo: string;

  @Prop()
  fecha: Date;

  @Prop()
  descripcion: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const EventCustomSchema = SchemaFactory.createForClass(EventCustom);
