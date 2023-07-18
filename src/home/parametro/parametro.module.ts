import { Module } from '@nestjs/common';
import { ParametroController } from './Parametro.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [ParametroController],
})
export class ParametroModule {}
