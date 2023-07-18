import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderSchema } from './schemas/slider.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slider.name, schema: SliderSchema }]),
  ],
  providers: [SliderService],
  exports: [SliderService],
})
export class SliderModule {}
