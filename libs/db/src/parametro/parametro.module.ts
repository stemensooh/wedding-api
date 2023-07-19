import { Module } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Parametro, ParametroSchema } from './schemas/parametro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parametro.name, schema: ParametroSchema },
    ]),
  ],
  providers: [ParametroService],
  exports: [ParametroService],
})
export class ParametroModuleLib {}
