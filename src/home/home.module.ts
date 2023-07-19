import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { SliderModule } from './slider/slider.module';
import { GalleryModule } from './gallery/gallery.module';
import { ParametroModule } from './parametro/parametro.module';
import { TimelineModule } from './timeline/timeline.module';
import { HomeController } from './home.controller';

@Module({
  imports: [
    SliderModule,
    GalleryModule,
    ParametroModule,
    TimelineModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [HomeController],
})
export class HomeModule {}
