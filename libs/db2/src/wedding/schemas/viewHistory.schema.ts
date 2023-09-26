
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wedding } from './wedding.shema';
import { ImagenDto } from '../dto/imagen.dto';
import { Imagen } from './image.schema';

export type ViewHistoryDocument = HydratedDocument<ViewHistory>;

@Schema()
export class ViewHistory {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wedding.name })
  weddingId: Wedding;
  
  @Prop() secChUa: string;
  @Prop() secChUaMobile: string;
  @Prop() secChUaPlatform: string;
  @Prop() secFetchDest: string;
  @Prop() secFetchMode: string;
  @Prop() secFetchSite: string;
  @Prop() userAgent: string;
  @Prop() ip: string;
  @Prop() titulo: string;
  
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const ViewHistorySchema = SchemaFactory.createForClass(ViewHistory);
