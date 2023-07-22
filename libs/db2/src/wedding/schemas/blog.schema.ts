
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';
import { ImagenDto } from '../dto/imagen.dto';
import { Imagen } from './image.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  
  @Prop() titulo: string;
  @Prop() fecha: Date;
  @Prop() lugar: string;
  @Prop() descripcion: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Imagen.name })
  @Prop() foto: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Imagen.name }) foto: Imagen;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
