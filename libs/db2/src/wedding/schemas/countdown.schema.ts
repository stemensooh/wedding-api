
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';

export type CountDownDocument = HydratedDocument<CountDown>;

@Schema()
export class CountDown {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  @Prop() fecha: string;
  @Prop() hora: string;
  @Prop() direccion: string;
  @Prop() url: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const CountDownSchema = SchemaFactory.createForClass(CountDown);
