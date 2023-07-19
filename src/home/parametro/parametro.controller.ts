import { ParametroService } from '@app/db/parametro/parametro.service';
import { createParametroDto } from '@app/db/parametro/dto/create-parametro.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('parametro')
export class ParametroController {
  constructor(private parametroService: ParametroService) {}

  @Get(':codigo')
  async get(@Param('codigo') codigo: string) {
    return await this.parametroService.get(codigo);
  }

  @Post()
  async create(@Body() create: createParametroDto) {
    return await this.parametroService.create(create);
  }
}
