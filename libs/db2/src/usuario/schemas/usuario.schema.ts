import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {

  _id: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
