import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventCustom } from './schemas/event.shema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventCustom.name)
    private usuarioModel: Model<EventCustom>,
  ) {}
}
