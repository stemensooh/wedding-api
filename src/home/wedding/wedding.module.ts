import { Module } from '@nestjs/common';
import { WeddingController } from './wedding.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [
    DbModule
  ],
  providers: [],
  controllers: [WeddingController]
})
export class WeddingModule {}
