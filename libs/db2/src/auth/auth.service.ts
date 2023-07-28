import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from '@app/db2/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { Wedding } from '../usuario/interfaces/usuario.interface';
import {
  GoogleRecaptchaException,
  GoogleRecaptchaValidator,
} from '@nestlab/google-recaptcha';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService,
    private readonly recaptchaValidator: GoogleRecaptchaValidator,
  ) {}

  async signIn(model: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(model.email);
    if (user?.password !== model.password) {
      throw new UnauthorizedException();
    }

    return await this.generarToken(user._id);
  }

  async signUp(model: RegistroUsuarioDto) {
    const existe = await this.usersService.validarExistencia(model.email);

    if (existe) {
      throw new BadRequestException('Usuario ya se encuentra registrado');
    }

    const user = await this.usersService.crearUsuario(model);

    return await this.generarToken(user._id);
  }

  async validarReCaptcha(recaptchaToken: string): Promise<void> {
    const result = await this.recaptchaValidator.validate({
      response: recaptchaToken,
      score: 0.8,
      action: 'SomeAction',
    });

    if (!result.success) {
      throw new GoogleRecaptchaException(result.errors);
    }
    // TODO: Your implemetation
  }

  async generarToken(id: string){
    const usuario = await this.usersService.obtenerUsuarioSignIn(id);

    if (usuario.weddings.length > 0) {
      usuario.wedding = usuario.weddings[0];
      usuario.weddings = undefined;
    }

    const wedding = usuario.wedding;

    const payload = {
      sub: usuario._id,
      user: {
        name: usuario.name,
        lastName: usuario.lastName,
        email: usuario.email
      },
      wedding: {
        id: wedding._id,
        tituloPagina: wedding.tituloPagina
      }
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
