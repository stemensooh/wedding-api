import { Module } from '@nestjs/common';
import { SliderController } from './slider.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [SliderController],
  providers: [],
})
export class SliderModule {}
