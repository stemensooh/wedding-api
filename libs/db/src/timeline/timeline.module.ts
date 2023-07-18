import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Timeline, TimelineSchema } from './schemas/timeline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timeline.name, schema: TimelineSchema },
    ]),
  ],
  providers: [TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
