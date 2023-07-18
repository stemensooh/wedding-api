import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeline } from './schemas/timeline.schema';
import { Model } from 'mongoose';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(Timeline.name)
    private sliderModel: Model<Timeline>,
  ) {}

  async get(): Promise<Timeline[]> {
    return this.sliderModel.find().exec();
  }
}
