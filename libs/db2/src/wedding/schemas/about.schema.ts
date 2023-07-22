
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';
import { ImagenDto } from '../dto/imagen.dto';
import { Imagen } from './image.schema';

export type AboutDocument = HydratedDocument<About>;

@Schema()
export class About {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  
  @Prop() foto: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Imagen.name }) foto: Imagen;

  @Prop()
  mensaje: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const AboutSchema = SchemaFactory.createForClass(About);
