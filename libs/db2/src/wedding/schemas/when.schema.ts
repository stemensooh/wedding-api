
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';

export type WhenDocument = HydratedDocument<When>;

@Schema()
export class When {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  @Prop() titulo: string;
  @Prop() hora: string;
  @Prop() descripcion: string;
  @Prop() ubicacion: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const WhenSchema = SchemaFactory.createForClass(When);
