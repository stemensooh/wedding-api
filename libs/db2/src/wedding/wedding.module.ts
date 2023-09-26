import { Module } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wedding, WeddingSchema } from './schemas/wedding.shema';
import { About, AboutSchema } from './schemas/about.schema';
import { Banner, BannerSchema } from './schemas/banner.schema';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { CountDown, CountDownSchema } from './schemas/countdown.schema';
import { Gallery, GallerySchema } from './schemas/gallery.schema';
import { Header, HeaderSchema } from './schemas/header.schema';
import { NavCustom, NavCustomSchema } from './schemas/nav.schema';
import { Testimonial, TestimonialSchema } from './schemas/testimonial.schema';
import { When, WhenSchema } from './schemas/when.schema';
import { Usuario, UsuarioSchema } from '../usuario/schemas/usuario.schema';
import { Imagen, ImagenSchema } from './schemas/image.schema';
import { ViewHistory, ViewHistorySchema } from './schemas/viewHistory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wedding.name, schema: WeddingSchema },
      { name: About.name, schema: AboutSchema },
      { name: Banner.name, schema: BannerSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: CountDown.name, schema: CountDownSchema },
      { name: Gallery.name, schema: GallerySchema },
      { name: Header.name, schema: HeaderSchema },
      { name: NavCustom.name, schema: NavCustomSchema },
      { name: Testimonial.name, schema: TestimonialSchema },
      { name: When.name, schema: WhenSchema },
      { name: Usuario.name, schema: UsuarioSchema },
      { name: Imagen.name, schema: ImagenSchema },
      { name: ViewHistory.name, schema: ViewHistorySchema },
    ]),
  ],
  providers: [WeddingService],
  exports: [WeddingService],
})
export class WeddingCustomeModule {}
