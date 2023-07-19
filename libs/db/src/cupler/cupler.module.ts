import { Module } from '@nestjs/common';
import { CuplerService } from './cupler.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cupler, CuplerSchema } from './schemas/cupler.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cupler.name, schema: CuplerSchema }]),
  ],
  providers: [CuplerService],
  exports: [CuplerService],
})
export class CuplerModule {}
