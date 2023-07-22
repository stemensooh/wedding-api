
import { Usuario } from '@app/db2/usuario/schemas/usuario.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WeddingDocument = HydratedDocument<Wedding>;

@Schema()
export class Wedding {
  _id: string;

  @Prop()
  tituloPagina: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Usuario.name })
  idUsuario: Usuario;
  
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding);
