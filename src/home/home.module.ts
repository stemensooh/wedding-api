import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { DbModule } from '@app/db';


@Module({
  imports: [
    DbModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HomeModule {}
