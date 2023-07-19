import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery } from './schemas/gallery.schema';
import { Model } from 'mongoose';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name)
    private galleryModel: Model<Gallery>,
  ) {}

  async getAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }
}
