import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/core/constants/jwt.secret';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';
import configuration from 'src/core/config/configuration';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@app/db/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

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
      config: configuration()
    };
  }

}
