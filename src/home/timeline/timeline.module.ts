import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [TimelineController],
})
export class TimelineModule {}
