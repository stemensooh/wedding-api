import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CuplerDocument = HydratedDocument<Cupler>;

@Schema()
export class Cupler {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  wedding_id: Wedding

  @Prop()
  novio_nombre: string;

  @Prop()
  novio_apellido: string;

  @Prop()
  novio_foto: string;

  @Prop()
  novio_descripcion: string;

  @Prop()
  novia_nombre: string;

  @Prop()
  novia_apellido: string;

  @Prop()
  novia_foto: string;

  @Prop()
  novia_descripcion: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const CuplerSchema = SchemaFactory.createForClass(Cupler);
