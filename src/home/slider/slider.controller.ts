import { SliderService } from '@app/db/slider/slider.service';
import { Controller, Get } from '@nestjs/common';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Get()
  get() {
    return this.sliderService.get();
  }
}
