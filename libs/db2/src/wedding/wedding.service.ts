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
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import configuration from '@app/db2/config/configuration';
import { ViewHistory } from './schemas/viewHistory.schema';

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

    @InjectModel(ViewHistory.name)
    private HistoryModel: Model<ViewHistory>,
  ) {
    cloudinary.config({
      cloud_name: configuration().CLOUDINARY.NAME,
      api_key: configuration().CLOUDINARY.API_KEY,
      api_secret: configuration().CLOUDINARY.API_SECRET,
    });
  }

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
    update = await this.validarImagenes(update);

    const existe = await this.weddingModel.findById(update._id).exec();
    if (!existe) {
      throw new BadRequestException('El perfil no se encuentra registrado');
    }

    if (existe.tituloPagina != update.header.tituloPagina) {
      const existeTitulo = await this.weddingModel
        .find({ tituloPagina: update.header.tituloPagina })
        .exec();

      if (existeTitulo.length > 0) {
        const existeRepetido = existeTitulo.filter((x) => x.id !== update._id);
        if (existeRepetido.length > 0) {
          throw new BadRequestException('El titulo ya se encuentra registrado');
        }
      }
    }
    // console.log(update._id);
    existe.tituloPagina = update.header.tituloPagina;
    existe.invitacion = update.header.invitacion;
    await this.weddingModel.findByIdAndUpdate(update._id, existe);

    // const req = new Wedding();
    // req.tituloPagina = update.header.tituloPagina;

    // const wedding = new this.weddingModel(req);
    // await this.weddingModel.findByIdAndUpdate(wedding);

    setTimeout(async () => {
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
      if (!update.nav._id) {
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
    }, 3000);
    return this.getId(update._id);
  }

  async create(create: WeddingRequestDto) {
    create = await this.validarImagenes(create);

    const req = new Wedding();
    req.tituloPagina = create.header.tituloPagina;
    req.invitacion = create.header.invitacion;

    const existe = await this.weddingModel
      .findOne({ tituloPagina: req.tituloPagina })
      .exec();

    if (existe) {
      throw new BadRequestException('El titulo ya se encuentra registrado');
    }

    const wedding = new this.weddingModel(req);
    await wedding.save();

    setTimeout(async () => {
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
    }, 3000);
    return await this.getId(wedding._id);
  }

  async validarImagenes(model: WeddingRequestDto) {
    model.nav.foto = await this.validarImagen('nav', model.nav.foto);
    model.header.foto = await this.validarImagen('header', model.header.foto);
    model.header.invitacion = await this.validarImagen(
      'invitacion',
      model.header.invitacion,
    );
    model.about.foto = await this.validarImagen('about', model.about.foto);

    model.gallery.forEach(async (item, index) => {
      item.archivo = await this.validarImagen(`gallery-${index}`, item.archivo);
    });

    model.blog.forEach(async (item, index) => {
      item.foto = await this.validarImagen(`blog-${index}`, item.foto);
    });

    return model;
  }

  async validarImagen(content: string, imagen: string) {
    const options: UploadApiOptions = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'wedding',
      // access_mode: 'authenticated',
    };

    if (imagen.includes('data:')) {
      try {
        const result = await cloudinary.uploader.upload(imagen, options);
        console.log(content, result);

        // const mode = await cloudinary.api.update_resources_access_mode_by_ids('authenticated', [result.public_id] )
        // console.log('access_mode', mode);

        return result.secure_url;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(content, imagen);
      return imagen;
    }
  }

  async getInvitacion(titulo: string) {
    return await this.weddingModel.findOne({ tituloPagina: titulo });
  }

  async getHistory(titulo: string) {
    const wedding = await this.weddingModel.findOne({ tituloPagina: titulo });

    return await this.HistoryModel.find({weddingId: wedding.id});
  }

  async createHistory(ip: string, titulo: string, request: Request) {
    const wedding = await this.weddingModel.findOne({ tituloPagina: titulo });

    const model = new ViewHistory();
    model.ip = ip;
    model.titulo = titulo;
    model.weddingId = wedding.id;
    model.secChUa = request.headers['sec-ch-ua'];
    model.secChUaMobile = request.headers['sec-ch-ua-mobile'];
    model.secChUaPlatform = request.headers['sec-ch-ua-platform'];
    model.secFetchDest = request.headers['sec-fetch-dest'];
    model.secFetchMode = request.headers['sec-fetch-mode'];
    model.secFetchSite = request.headers['sec-fetch-site'];
    model.userAgent = request.headers['user-agent'];

    model.xEnvoyExternalAddress = request.headers['x-envoy-external-address'];
    model.xForwardedFor = request.headers['x-forwarded-for'];
    model.usexForwardedProto = request.headers['x-forwarded-proto'];
    model.xRequestId = request.headers['x-request-id'];

    const history = new this.HistoryModel(model);
    return await history.save();
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
