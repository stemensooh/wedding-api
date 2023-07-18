import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery {
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

export const GallerySchema = SchemaFactory.createForClass(Gallery);
