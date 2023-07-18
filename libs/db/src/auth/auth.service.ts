import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from '@app/db/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(model: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(model.username);
    if (user?.password !== model.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user._id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(model: RegistroUsuarioDto) {
    const existe = await this.usersService.validarExistencia(
      model.username,
      model.email,
    );
    if (existe) {
      throw new BadRequestException('Usuario ya se encuentra registrado');
    }

    const user = await this.usersService.crearUsuario(model);

    const payload = {
      sub: user._id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
