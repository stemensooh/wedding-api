import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wedding } from './schemas/wedding.shema';
import { ObjectId } from 'mongodb';
import { About } from './schemas/about.schema';
import { Banner } from './schemas/banner.schema';
import { Blog } from './schemas/blog.schema';
import { CountDown } from './schemas/countdown.schema';
import { Gallery } from './schemas/gallery.schema';
import { Header } from './schemas/header.schema';
import { NavCustom } from './schemas/nav.schema';
import { Testimonial } from './schemas/testimonial.schema';
import { When } from './schemas/when.schema';
import { WeddingRequestDto } from './dto/wedding-request.dto';

@Injectable()
export class WeddingService {

  lookup: any[] = [
    {
      $lookup: {
        from: 'abouts',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'abouts',
      },
    },
    {
      $lookup: {
        from: 'banners',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'banners',
      },
    },
    {
      $lookup: {
        from: 'blogs',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'blogs',
      },
    },
    {
      $lookup: {
        from: 'countdowns',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'countdowns',
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
        from: 'headers',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'headers',
      },
    },

    {
      $lookup: {
        from: 'navcustoms',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'navcustoms',
      },
    },

    {
      $lookup: {
        from: 'testimonials',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'testimonials',
      },
    },

    {
      $lookup: {
        from: 'whens',
        localField: '_id',
        foreignField: 'weddingId',
        as: 'whens',
      },
    },

  ];

  constructor(
    @InjectModel(Wedding.name)
    private weddingModel: Model<Wedding>,

    @InjectModel(About.name)
    private aboutModel: Model<About>,

    @InjectModel(Banner.name)
    private bannerModel: Model<Banner>,

    @InjectModel(Blog.name)
    private BlogModel: Model<Blog>,

    @InjectModel(CountDown.name)
    private CountDownModel: Model<CountDown>,

    @InjectModel(Gallery.name)
    private GalleryModel: Model<Gallery>,

    @InjectModel(Header.name)
    private HeaderModel: Model<Header>,

    @InjectModel(NavCustom.name)
    private NavCustomModel: Model<NavCustom>,

    @InjectModel(Testimonial.name)
    private TestimonialModel: Model<Testimonial>,

    @InjectModel(When.name)
    private WhenModel: Model<When>,

  ) {}

  async getAll() {
    return await this.weddingModel.aggregate(this.lookup);
  }

  async getTitulo(titulo: string){
    const result = await this.weddingModel.aggregate([
      ...this.lookup,
      {
        $match: { tituloPagina: titulo },
      },
    ]);

    return result?.[0];
  }

  async getId(id: string) {
    const result = await this.weddingModel.aggregate([
      ...this.lookup,
      {
        $match: { _id: new ObjectId(id) },
      },
    ]);

    return result?.[0];
  }

  async create(create: WeddingRequestDto) {
    const req = new Wedding();
    req.tituloPagina = create.header.tituloPagina;

    const existe = this.weddingModel.findOne({tituloPagina: req.tituloPagina}).exec();
    if (existe) {

    }

    const wedding = new this.weddingModel(req);
    await wedding.save();
    //******************************************************************************** */
    const newGallery = create.gallery.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const gallery = await this.GalleryModel.insertMany(newGallery);
    //******************************************************************************** */
    const newblog = create.blog.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const blog = await this.BlogModel.insertMany(newblog);
    //******************************************************************************** */
    const newwhen = create.when.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const when = await this.WhenModel.insertMany(newwhen);
    //******************************************************************************** */
    const newtestimonial = create.testimonial.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    const testimonial = await this.TestimonialModel.insertMany(newtestimonial);
    //******************************************************************************** */
    create.nav.weddingId = wedding.id;
    const nav = new this.NavCustomModel(create.nav);
    await nav.save();
    //******************************************************************************** */
    create.header.weddingId = wedding.id;
    const header = new this.HeaderModel(create.header);
    await header.save();
    //******************************************************************************** */
    create.about.weddingId = wedding.id;
    const about = new this.aboutModel(create.about);
    await about.save();
    //******************************************************************************** */
    create.banner.weddingId = wedding.id;
    const banner = new this.bannerModel(create.banner);
    await banner.save();
    //******************************************************************************** */
    create.countdown.weddingId = wedding.id;
    const countdown = new this.CountDownModel(create.countdown);
    await countdown.save();
    //******************************************************************************** */
    

    return [
      wedding,
      header,
      about,
      countdown,
      blog,
      gallery,
      when,
      banner,
      nav,
      testimonial
    ] ;


  }

  /*
  async create(create: WeddingRequestDto) {
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
  */
}
