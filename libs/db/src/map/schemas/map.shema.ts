import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MapDocument = HydratedDocument<Map>;

@Schema()
export class Map {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  wedding_id: Wedding

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

export const MapSchema = SchemaFactory.createForClass(Map);
