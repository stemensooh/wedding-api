import { Cupler } from '@app/db/cupler/schemas/cupler.schema';
import { MapCustom } from '@app/db/map/schemas/map.schema';
import { Timeline } from '@app/db/timeline/schemas/timeline.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WeddingDocument = HydratedDocument<Wedding>;

@Schema()
export class Wedding {
  _id: string;

  @Prop()
  fecha: Date;

  @Prop()
  resumen: string;

  @Prop()
  mensaje: string;

  // @Prop({ type: [MapCustom], ref: MapCustom.name })
  // @Prop()
  // mapas: MapCustom[];

  // // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Timeline.name })
  // @Prop()
  // timelines: Timeline[];

  // // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Cupler.name })
  // @Prop()
  // novios: Cupler;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding);
