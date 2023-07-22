
import { BlogDto } from './blog.dto';
import { ImagenDto } from './imagen.dto';
import { TestimonioDto } from './testimonio.dtp';
import { WhenDto } from './when.dto';

export interface WeddingRequestDto {
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
  weddingId: string;
  foto: string;
    //foto: ImagenDto;
  mensaje: string;
}

export interface HeaderRequestDto {
  weddingId: string;
  tituloPagina: string;
  mensaje: string;
  foto: string;
    //foto: ImagenDto;
}

export interface AboutRequestDto {
  weddingId: string;
  foto: string;
    //foto: ImagenDto;
  mensaje: string;
}

export interface BannerRequestDto {
  weddingId: string;
  nombreNovia: string;
  nombreNovio: string;
  apellidoNovia: string;
  apellidoNovio: string;
  direccion1: string;
  direccion2: string;
}

export interface CountdownRequestDto {
  weddingId: string;
  fecha: Date;
  hora: string;
  direccion: string;
  url: string;
}
