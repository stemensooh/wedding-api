import { Module } from '@nestjs/common';
import { WeddingController } from './wedding.controller';
import { Db2Module } from '@app/db2';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Module({
  imports: [Db2Module],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [WeddingController],
})
export class WeddingModule {}
