import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SliderModule } from './slider/slider.module';
import { GalleryModule } from './gallery/gallery.module';
import { TimelineModule } from './timeline/timeline.module';
import { ParametroModuleLib } from './parametro/parametro.module';
import { WeddingModule } from './wedding/wedding.module';
import { CuplerModule } from './cupler/cupler.module';
import { EventModule } from './event/event.module';
import { MapService } from './map/map.service';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    AuthModule,
    SliderModule,
    GalleryModule,
    ParametroModuleLib,
    TimelineModule,
    WeddingModule,
    CuplerModule,
    EventModule,
    MapModule,
  ],
  exports: [
    AuthModule,
    SliderModule,
    GalleryModule,
    ParametroModuleLib,
    TimelineModule,
    WeddingModule,
    CuplerModule,
    EventModule,
    MapModule,
  ],
  providers: [],
})
export class DbModule {}
