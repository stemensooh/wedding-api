import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeline } from './schemas/timeline.schema';
import { Model } from 'mongoose';
import { CreateLineDto } from './dto/create-line.dto';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(Timeline.name)
    private sliderModel: Model<Timeline>,
  ) {}

  async getAll(): Promise<Timeline[]> {
    return this.sliderModel.find().exec();
  }

  async create(create: CreateLineDto){
    const db = new this.sliderModel(create);
    return db.save();
  }
}
