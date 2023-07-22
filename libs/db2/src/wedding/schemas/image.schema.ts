
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';
import { ImagenDto } from '../dto/imagen.dto';

export type ImagenDocument = HydratedDocument<Imagen>;

@Schema()
export class Imagen {
  _id: string;

  @Prop() archivo: string;
  @Prop() nombre: string;
  @Prop() tipo: string;
  
}

export const ImagenSchema = SchemaFactory.createForClass(Imagen);
