import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventCustom, EventCustomSchema } from './schemas/event.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventCustom.name, schema: EventCustomSchema },
    ]),
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
