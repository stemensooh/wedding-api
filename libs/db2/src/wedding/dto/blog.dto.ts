import { ImagenDto } from "./imagen.dto";

export class BlogDto {
    _id?: string;
    weddingId!: string;
    titulo!: string;
    fecha!: string;
    lugar!: string;
    descripcion!: string;
    foto!: string;
    //foto!: ImagenDto
}