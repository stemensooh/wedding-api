import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wedding } from './schemas/wedding.shema';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { Cupler } from '../cupler/schemas/cupler.schema';
import { MapCustom } from '../map/schemas/map.schema';
import { Timeline } from '../timeline/schemas/timeline.schema';
import { EventCustom } from '../event/schemas/event.shema';
import { Gallery } from '../gallery/schemas/gallery.schema';
import { Slider } from '../slider/schemas/slider.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class WeddingService {
  constructor(
    @InjectModel(Wedding.name)
    private weddingModel: Model<Wedding>,

    @InjectModel(MapCustom.name)
    private mapModel: Model<MapCustom>,

    @InjectModel(Timeline.name)
    private timelineModel: Model<Timeline>,

    @InjectModel(Cupler.name)
    private cuplerModel: Model<Cupler>,

    @InjectModel(EventCustom.name)
    private eventService: Model<EventCustom>,

    @InjectModel(Gallery.name)
    private galeriaService: Model<Gallery>,

    @InjectModel(Slider.name)
    private sliderService: Model<Slider>,
  ) {}

  async getAll() {
    return await this.weddingModel.aggregate([
      {
        $lookup: {
          from: 'cuplers',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'cupler',
        },
      },
      {
        $lookup: {
          from: 'sliders',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'sliders',
        },
      },
      {
        $lookup: {
          from: 'galleries',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'galleries',
        },
      },
      {
        $lookup: {
          from: 'eventcustoms',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'events',
        },
      },
      {
        $lookup: {
          from: 'timelines',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'timelines',
        },
      },
      {
        $lookup: {
          from: 'mapcustoms',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'maps',
        },
      },
    ]);
  }

  async get(id: string) {
    const result = await this.weddingModel.aggregate([
      {
        $lookup: {
          from: 'cuplers',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'cupler',
        },
      },
      {
        $lookup: {
          from: 'sliders',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'sliders',
        },
      },
      {
        $lookup: {
          from: 'galleries',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'galleries',
        },
      },
      {
        $lookup: {
          from: 'eventcustoms',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'events',
        },
      },
      {
        $lookup: {
          from: 'timelines',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'timelines',
        },
      },
      {
        $lookup: {
          from: 'mapcustoms',
          localField: '_id',
          foreignField: 'weddingId',
          as: 'maps',
        },
      },
      {
        $match: { _id: new ObjectId(id) },
      },
    ]);

    return result?.[0];
  }

  async create(create: CreateWeddingDto) {
    const wedding = new this.weddingModel(create);
    await wedding.save();

    const newMaps = create.mapas.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const maps = await this.mapModel.insertMany(newMaps);

    const newTimelines = create.timelines.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const timeline = await this.timelineModel.insertMany(newTimelines);

    create.novios.weddingId = wedding.id;
    const cupler = new this.cuplerModel(create.novios);
    await cupler.save();

    const newEvents = create.eventos.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const events = await this.eventService.insertMany(newEvents);

    const newGaleria = create.galeria.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const gallery = await this.galeriaService.insertMany(newGaleria);

    const newSlider = create.sliders.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const sliders = await this.sliderService.insertMany(newSlider);

    return {
      wedding,
      maps,
      timeline,
      cupler,
      events,
      gallery,
      sliders,
    };
  }
}
