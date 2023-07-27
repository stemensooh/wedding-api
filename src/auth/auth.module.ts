import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Db2Module } from '@app/db2';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { ConfigModule, ConfigType } from '@nestjs/config';
import configuration from '@app/db2/config/configuration';

@Module({
  imports: [
    Db2Module,
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        return {
          secretKey: configService.GOOGLE_RECAPTCHA.SECRET_KEY,
          response: (req) => req.headers.recaptcha,
        };
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
