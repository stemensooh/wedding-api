import { SliderService } from '@app/db/slider/slider.service';
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Get()
  get() {
    return this.sliderService.getAll();
  }
}
