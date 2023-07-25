import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getTitulo(titulo: string) {
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

  async update(update: WeddingRequestDto) {

    const existe = await this.weddingModel.findById(update._id).exec();
    if (!existe) {
      throw new BadRequestException('El perfil no se encuentra registrado');
    }

    // const req = new Wedding();
    // req.tituloPagina = update.header.tituloPagina;

    // const wedding = new this.weddingModel(req);
    // await this.weddingModel.findByIdAndUpdate(wedding);

    //******************************************************************************** */
    await this.GalleryModel.deleteMany({ weddingId: update._id });
    await this.GalleryModel.insertMany(update.gallery);
    //******************************************************************************** */
    await this.BlogModel.deleteMany({ weddingId: update._id });
    await this.BlogModel.insertMany(update.blog);
    //******************************************************************************** */
    await this.WhenModel.deleteMany({ weddingId: update._id });
    await this.WhenModel.insertMany(update.when);
    //******************************************************************************** */
    await this.TestimonialModel.deleteMany({ weddingId: update._id });
    await this.TestimonialModel.insertMany(update.testimonial);
    //******************************************************************************** */
    if (update.nav._id) {
      const nav = new this.NavCustomModel(update.nav);
      await nav.save();
    } else {
      await this.NavCustomModel.findByIdAndUpdate(update.nav._id, update.nav);
    }

    //******************************************************************************** */
    if (!update.header._id) {
      const header = new this.HeaderModel(update.header);
      await header.save();
    } else {
      await this.HeaderModel.findByIdAndUpdate(
        update.header._id,
        update.header,
      );
    }
    //******************************************************************************** */

    if (!update.about._id) {
      const about = new this.aboutModel(update.about);
      await about.save();
    } else {
      await this.aboutModel.findByIdAndUpdate(update.about._id, update.about);
    }
    //******************************************************************************** */

    if (!update.banner._id) {
      const banner = new this.bannerModel(update.banner);
      await banner.save();
    } else {
      await this.bannerModel.findByIdAndUpdate(
        update.banner._id,
        update.banner,
      );
    }
    //******************************************************************************** */

    if (!update.countdown._id) {
      const countdown = new this.CountDownModel(update.countdown);
      await countdown.save();
    } else {
      await this.CountDownModel.findByIdAndUpdate(
        update.countdown._id,
        update.countdown,
      );
    }

    //******************************************************************************** */

    return this.getId(update._id);
  }

  async create(create: WeddingRequestDto) {
    const req = new Wedding();
    req.tituloPagina = create.header.tituloPagina;

    const existe = await this.weddingModel
      .findOne({ tituloPagina: req.tituloPagina })
      .exec();

    if (existe) {
      throw new BadRequestException('El titulo ya se encuentra registrado');
    }

    const wedding = new this.weddingModel(req);
    await wedding.save();
    //******************************************************************************** */
    const newGallery = create.gallery.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    await this.GalleryModel.insertMany(newGallery);
    //******************************************************************************** */
    const newblog = create.blog.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    await this.BlogModel.insertMany(newblog);
    //******************************************************************************** */
    const newwhen = create.when.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    await this.WhenModel.insertMany(newwhen);
    //******************************************************************************** */
    const newtestimonial = create.testimonial.map((item) => {
      item.weddingId = wedding.id;
      return item;
    });
    await this.TestimonialModel.insertMany(newtestimonial);
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

    return await this.getId(wedding._id);
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
