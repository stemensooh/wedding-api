import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@app/db2/auth/auth.service';
import { Public } from 'src/core/constants/jwt.secret';
import { LoginDto } from '@app/db2/auth/dto/login.dto';
import { RegistroUsuarioDto } from '@app/db2/auth/dto/registro-usuario.dto';
import configuration from '@app/db2/config/configuration';
import { Recaptcha } from '@nestlab/google-recaptcha/decorators/recaptcha';
import {
  RecaptchaResult,
  RecaptchaVerificationResult,
} from '@nestlab/google-recaptcha';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() model: LoginDto) {
    return this.authService.signIn(model);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() model: RegistroUsuarioDto) {
    return this.authService.signUp(model);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('env')
  load() {
    return {
      configService: this.configService.get<string>('db.mongodb'),
      env: process.env,
      config: configuration(),
    };
  }

  @Public()
  @Recaptcha({ response: (req) => req.body.recaptha })
  @Post('recaptcha')
  async send(
    @RecaptchaResult() recaptchaResult: RecaptchaVerificationResult,
  ): Promise<any> {
    console.log(
      `Action: ${recaptchaResult.action} Score: ${recaptchaResult.score}`,
    );

    // return this.authService.validarReCaptcha(recaptchaResult);
    // TODO: Your implementation.
  }
}
