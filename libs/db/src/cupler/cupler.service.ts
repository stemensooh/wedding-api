import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cupler } from './schemas/cupler.schema';
import { Model } from 'mongoose';

@Injectable()
export class CuplerService {
  constructor(
    @InjectModel(Cupler.name)
    private usuarioModel: Model<Cupler>,
  ) {}
}
