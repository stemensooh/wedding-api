import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  wedding_id: Wedding

  @Prop()
  titulo: string;

  @Prop()
  foto: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
