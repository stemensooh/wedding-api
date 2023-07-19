import { Module } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wedding, WeddingSchema } from './schemas/wedding.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wedding.name, schema: WeddingSchema }]),
  ],
  providers: [WeddingService],
  exports: [WeddingService],
})
export class WeddingModule {}
