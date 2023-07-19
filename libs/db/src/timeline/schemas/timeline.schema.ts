import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TimelineDocument = HydratedDocument<Timeline>;

@Schema()
export class Timeline {
  _id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding

  @Prop()
  fecha: Date;

  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  icono: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const TimelineSchema = SchemaFactory.createForClass(Timeline);
