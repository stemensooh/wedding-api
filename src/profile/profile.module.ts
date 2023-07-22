import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { Db2Module } from '@app/db2';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { WeddingService } from '@app/db2/wedding/wedding.service';

@Module({
  imports: [Db2Module],
  controllers: [ProfileController],
})
export class ProfileModule {}
