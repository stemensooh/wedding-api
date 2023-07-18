import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimelineDocument = HydratedDocument<Timeline>;

@Schema()
export class Timeline {
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

export const TimelineSchema = SchemaFactory.createForClass(Timeline);
