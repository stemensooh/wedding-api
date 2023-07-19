import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MapCustomDocument = HydratedDocument<MapCustom>;

@Schema()
export class MapCustom {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding

  @Prop()
  descripcion: string;

  @Prop()
  coordenadas: string;

  @Prop()
  mensaje: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const MapCustomSchema = SchemaFactory.createForClass(MapCustom);
