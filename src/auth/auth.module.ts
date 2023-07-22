import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Db2Module } from '@app/db2';

@Module({
  imports: [Db2Module],
  controllers: [AuthController],
})
export class AuthModule {}
