import { CreateWeddingDto } from '@app/db/wedding/dto/create-wedding.dto';
import { WeddingService } from '@app/db/wedding/wedding.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  async create(@Body() create: CreateWeddingDto){
    // console.log(create);
    return await this.weddingService.create(create);
  }
}
