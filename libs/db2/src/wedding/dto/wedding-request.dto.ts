
import { BlogDto } from './blog.dto';
import { ImagenDto } from './imagen.dto';
import { TestimonioDto } from './testimonio.dtp';
import { WhenDto } from './when.dto';

export interface WeddingRequestDto {
  _id: string;
  nav: NavRequestDto;
  header: HeaderRequestDto;
  about: AboutRequestDto;
  banner: AboutRequestDto;
  gallery: ImagenDto[];
  countdown: CountdownRequestDto;
  blog: BlogDto[];
  when: WhenDto[];
  testimonial: TestimonioDto[];
}

export interface NavRequestDto {
  _id: string;
  weddingId: string;
  foto: string;
    //foto: ImagenDto;
  mensaje: string;
}

export interface HeaderRequestDto {
  _id: string;
  weddingId: string;
  tituloPagina: string;
  mensaje: string;
  foto: string;
  invitacion: string;
    //foto: ImagenDto;
}

export interface AboutRequestDto {
  _id: string;
  weddingId: string;
  foto: string;
    //foto: ImagenDto;
  mensaje: string;
}

export interface BannerRequestDto {
  _id: string;
  weddingId: string;
  nombreNovia: string;
  nombreNovio: string;
  apellidoNovia: string;
  apellidoNovio: string;
  direccion1: string;
  direccion2: string;
}

export interface CountdownRequestDto {
  _id: string;
  weddingId: string;
  fecha: string;
  hora: string;
  direccion: string;
  url: string;
}
