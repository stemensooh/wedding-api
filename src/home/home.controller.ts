import { Controller, Get } from '@nestjs/common';
import { TimelineService } from '@app/db/timeline/timeline.service';
import { ParametroService } from '@app/db/parametro/parametro.service';
import { GalleryService } from '@app/db/gallery/gallery.service';
import { SliderService } from '@app/db/slider/slider.service';

@Controller('home')
export class HomeController {
  constructor(
    // private sliderService: SliderService,
    // private timelineService: TimelineService,
    // private parametroService: ParametroService,
    // private galleryService: GalleryService
  ) {}

  @Get()
  async getAllData() {
    // const sliders = await this.sliderService.getAll();
    // const timelines = await this.timelineService.getAll();
    // const galleries = await this.galleryService.getAll();
    // const parametros = await this.parametroService.get();
  }
}
