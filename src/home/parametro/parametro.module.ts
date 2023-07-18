import { Module } from '@nestjs/common';
import { DbModule } from '@app/db';
import { ParametroController } from './parametro.controller';

@Module({
  imports: [DbModule],
  controllers: [ParametroController],
})
export class ParametroModule {}
