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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() model: LoginDto) {
    return this.authService.signIn(model);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
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
}
