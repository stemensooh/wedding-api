import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
