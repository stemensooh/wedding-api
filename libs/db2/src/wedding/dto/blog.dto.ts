import { ImagenDto } from "./imagen.dto";

export class BlogDto {
    weddingId!: string;
    titulo!: string;
    fecha!: Date;
    lugar!: string;
    descripcion!: string;
    foto!: string;
    //foto!: ImagenDto
}