import { WeddingRequestDto } from '@app/db2/wedding/dto/wedding-request.dto';
import { WeddingService } from '@app/db2/wedding/wedding.service';
import { Body, Controller, Post, RawBodyRequest, Req, Put, NestMiddleware, Get, ExecutionContext, Ip, Param, UseGuards } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';
import { AuthGuard } from 'src/core/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private weddingService: WeddingService) {}

  @Post()
  async create(@Body() create: WeddingRequestDto) {
    return await this.weddingService.create(create);
  }

  @Get('history/:titulo')
  async getHistory(@Param('titulo') titulo: string) {
    return this.weddingService.getHistory(titulo);
  }

  @Public()
  @Post('history/:titulo')
  async createHistory(@Ip() ip, @Param('titulo') titulo: string, @Req() request: Request) {
    return {
      headers: request.headers,
      row: await this.weddingService.createHistory(ip, titulo, request)
    };
  }

  @Put()
  async update(@Body() update: WeddingRequestDto) {
    return await this.weddingService.update(update);
  }

}
