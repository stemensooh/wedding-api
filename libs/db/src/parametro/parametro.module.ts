import { Module } from '@nestjs/common';
import { ParametroService } from './Parametro.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Parametro, ParametroSchema } from './schemas/Parametro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parametro.name, schema: ParametroSchema },
    ]),
  ],
  providers: [ParametroService],
  exports: [ParametroService],
})
export class ParametroModule {}
