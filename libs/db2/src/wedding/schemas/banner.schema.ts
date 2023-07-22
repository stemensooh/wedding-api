
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  
  @Prop() nombreNovia: string;
  @Prop() nombreNovio: string;
  @Prop() apellidoNovia: string;
  @Prop() apellidoNovio: string;
  @Prop() direccion1: string;
  @Prop() direccion2: string;
  
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
