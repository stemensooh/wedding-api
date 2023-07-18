import { GalleryService } from '@app/db/gallery/gallery.service';
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Get()
  get() {
    return this.galleryService.get();
  }
}
