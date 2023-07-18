import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [GalleryController],
})
export class GalleryModule {}
