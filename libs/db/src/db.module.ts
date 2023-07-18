import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SliderModule } from './slider/slider.module';
import { GalleryModule } from './gallery/gallery.module';
import { TimelineModule } from './timeline/timeline.module';
import { ParametroModuleLib } from './parametro/parametro.module';

@Module({
  imports: [
    AuthModule,
    SliderModule,
    GalleryModule,
    ParametroModuleLib,
    TimelineModule,
  ],
  exports: [
    AuthModule,
    SliderModule,
    GalleryModule,
    ParametroModuleLib,
    TimelineModule,
  ],
})
export class DbModule {}
