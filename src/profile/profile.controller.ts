import { WeddingRequestDto } from '@app/db2/wedding/dto/wedding-request.dto';
import { WeddingService } from '@app/db2/wedding/wedding.service';
import { Body, Controller, Post, RawBodyRequest, Req, Put } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('profile')
export class ProfileController {
  constructor(private weddingService: WeddingService) {}

  @Post()
  async create(@Body() create: WeddingRequestDto) {
    return await this.weddingService.create(create);
  }

  @Post('validar')
  async validarImagen(@Body() req: {imagen: string}) {
    // console.log(req);
    return await this.weddingService.validarImagen('', req.imagen);
  }

  @Put()
  async update(@Body() update: WeddingRequestDto) {
    return await this.weddingService.update(update);
  }

}
