import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SliderDocument = HydratedDocument<Slider>;

@Schema()
export class Slider {
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

export const SliderSchema = SchemaFactory.createForClass(Slider);
