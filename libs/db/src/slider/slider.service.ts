import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Slider } from './schemas/slider.schema';
import { Model } from 'mongoose';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel(Slider.name)
    private sliderModel: Model<Slider>,
  ) {}

  async get(): Promise<Slider[]> {
    return this.sliderModel.find().exec();
  }
}
