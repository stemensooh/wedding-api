
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema()
export class Testimonial {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  @Prop() descripcion: string;
  @Prop() autor: string;
  @Prop() parentezco: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
