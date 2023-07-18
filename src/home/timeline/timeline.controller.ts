import { CreateLineDto } from '@app/db/timeline/dto/create-line.dto';
import { TimelineService } from '@app/db/timeline/timeline.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('timeline')
export class TimelineController {
  constructor(private timelineService: TimelineService) {}

  @Get()
  async getAll() {
    return await this.timelineService.getAll();
  }

  @Post()
  async create(@Body() create: CreateLineDto) {
    return await this.timelineService.create(create);
  }
}
