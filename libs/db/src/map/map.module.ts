import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapCustom, MapCustomSchema } from './schemas/map.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MapCustom.name, schema: MapCustomSchema }])],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
