import { Module } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wedding, WeddingSchema } from './schemas/wedding.shema';
import { MapCustom, MapCustomSchema } from '../map/schemas/map.schema';
import { Cupler, CuplerSchema } from '../cupler/schemas/cupler.schema';
import { Timeline, TimelineSchema } from '../timeline/schemas/timeline.schema';
import { Slider, SliderSchema } from '../slider/schemas/slider.schema';
import { EventCustom, EventCustomSchema } from '../event/schemas/event.shema';
import { Gallery, GallerySchema } from '../gallery/schemas/gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wedding.name, schema: WeddingSchema },
      { name: MapCustom.name, schema: MapCustomSchema },
      { name: Cupler.name, schema: CuplerSchema },
      { name: Timeline.name, schema: TimelineSchema },
      { name: Slider.name, schema: SliderSchema },
      { name: EventCustom.name, schema: EventCustomSchema },
      { name: Gallery.name, schema: GallerySchema },
    ]),
  ],
  providers: [WeddingService],
  exports: [WeddingService],
})
export class WeddingModule {}
