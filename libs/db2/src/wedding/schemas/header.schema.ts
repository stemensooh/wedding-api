
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';
import { ImagenDto } from '../dto/imagen.dto';
import { Imagen } from './image.schema';

export type HeaderDocument = HydratedDocument<Header>;

@Schema()
export class Header {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  @Prop() foto: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Imagen.name }) foto: Imagen;
  @Prop() mensaje: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const HeaderSchema = SchemaFactory.createForClass(Header);
