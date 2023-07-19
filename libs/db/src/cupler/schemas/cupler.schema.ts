import { Wedding } from '@app/db/wedding/schemas/wedding.shema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CuplerDocument = HydratedDocument<Cupler>;

@Schema()
export class Cupler {
  _id: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding

  @Prop()
  novioNombre: String;

  @Prop()
  novioApellido: String;

  @Prop()
  novioFoto: String;

  @Prop()
  novioDescripcion: String;

  @Prop()
  noviaNombre: String;

  @Prop()
  noviaApellido: String;

  @Prop()
  noviaFoto: String;

  @Prop()
  noviaDescripcion: String;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const CuplerSchema = SchemaFactory.createForClass(Cupler);
