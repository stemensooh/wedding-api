
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  
  @Prop() archivo: string;
  @Prop() nombre: string;
  @Prop() tipo: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
