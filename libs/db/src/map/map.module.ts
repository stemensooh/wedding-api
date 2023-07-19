import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Map, MapSchema } from './schemas/map.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Map.name, schema: MapSchema }])],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
