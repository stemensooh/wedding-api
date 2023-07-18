import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { DbModule } from '@app/db';
import { SliderModule } from './slider/slider.module';
import { GalleryModule } from './gallery/gallery.module';
import { ParametroModule } from './Parametro/Parametro.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [DbModule, SliderModule, GalleryModule, ParametroModule, TimelineModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HomeModule {}
