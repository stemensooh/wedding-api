import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Parametro } from './schemas/parametro.schema';
import { Model } from 'mongoose';
import { createParametroDto } from './dto/create-parametro.dto';

@Injectable()
export class ParametroService {
  constructor(
    @InjectModel(Parametro.name)
    private parametroModel: Model<Parametro>,
  ) {}

  async get(codigo: string): Promise<Parametro[]> {
    const data = await this.parametroModel.find({ codigo: codigo }).exec();
    if (!data) {
      return [];
    }
    return data;
  }

  async create(create: createParametroDto) {
    const db = new this.parametroModel(create);
    return db.save();
  }
}
