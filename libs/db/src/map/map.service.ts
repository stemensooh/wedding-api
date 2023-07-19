import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MapCustom } from './schemas/map.schema';

@Injectable()
export class MapService {
  constructor(
    @InjectModel(MapCustom.name)
    private mapModel: Model<MapCustom>,
  ) {}
}
