import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Parametro } from './schemas/parametro.schema';
import { Model } from 'mongoose';

@Injectable()
export class ParametroService {
  constructor(
    @InjectModel(Parametro.name)
    private ParametroModel: Model<Parametro>,
  ) {}

  async get(): Promise<Parametro[]> {
    return this.ParametroModel.find().exec();
  }
}
