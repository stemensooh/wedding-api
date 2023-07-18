import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SliderModule } from './slider/slider.module';
import { GalleryModule } from './gallery/gallery.module';
import { ParametroModule } from './Parametro/Parametro.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [AuthModule, SliderModule, GalleryModule, ParametroModule, TimelineModule],
  exports: [AuthModule, SliderModule, GalleryModule, ParametroModule],
})
export class DbModule {}
