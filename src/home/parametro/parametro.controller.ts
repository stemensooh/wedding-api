import { ParametroService } from '@app/db/Parametro/Parametro.service';
import { Controller, Get } from '@nestjs/common';

@Controller('Parametro')
export class ParametroController {
  constructor(private ParametroService: ParametroService) {}

  @Get()
  get() {
    return this.ParametroService.get();
  }
}
