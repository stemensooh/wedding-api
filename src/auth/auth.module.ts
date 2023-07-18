import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [
    DbModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
