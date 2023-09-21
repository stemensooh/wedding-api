import { WeddingRequestDto } from '@app/db2/wedding/dto/wedding-request.dto';
import { WeddingService } from '@app/db2/wedding/wedding.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('wedding')
export class WeddingController {
  constructor(private weddingService: WeddingService) {}

  @Get()
  async getAll() {
    return await this.weddingService.getAll();
  }

  @Get(':id')
  async getId(@Param('id') id: string) {
    return await this.weddingService.getId(id);
  }

  @Get('titulo/:titulo')
  async getTitulo(@Param('titulo') titulo: string) {
    return await this.weddingService.getTitulo(titulo);
  }

  @Get('invitacion/:titulo')
  async getInvitacion(@Param('titulo') titulo: string) {
    return await this.weddingService.getInvitacion(titulo);
  }

  @Post()
  async create(@Body() create: WeddingRequestDto) {
    return await this.weddingService.create(create);
  }

}
