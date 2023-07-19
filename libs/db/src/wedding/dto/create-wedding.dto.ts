import { CreateCuplerDto } from "@app/db/cupler/dto/create-cupler.dto";
import { CreateEventoDto } from "@app/db/event/dto/create-evento.dto";
import { CreateGaleriaDto } from "@app/db/gallery/dto/create-galeria.dto";
import { CreateMap } from "@app/db/map/dto/create-map.dto";
import { CreateSliderDto } from "@app/db/slider/dto/create-slider.dto";
import { CreateLineDto } from "@app/db/timeline/dto/create-line.dto";

export class CreateWeddingDto {
    fecha: Date;
    resumen: string;
    mensaje: string;
    mapas: CreateMap[];
    timelines: CreateLineDto[];
    novios: CreateCuplerDto;
    sliders: CreateSliderDto[];
    galeria: CreateGaleriaDto[];
    eventos: CreateEventoDto[];
}

