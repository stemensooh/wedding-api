import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from '@app/db/usuario/schemas/usuario.schema';
import { Model } from 'mongoose';
import { RegistroUsuarioDto } from '../auth/dto/registro-usuario.dto';

// export type User = any;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,
  ) {}

  async findOne(username: string): Promise<Usuario> {
    const datos = await this.usuarioModel.find({ username: username });
    return datos?.[0];
  }

  async validarExistencia(username: string, email: string): Promise<Usuario> {
    const datos = await this.usuarioModel.find({
      username: username,
      email: email,
    });
    return datos?.[0];
  }

  async crearUsuario(usuario: RegistroUsuarioDto): Promise<Usuario> {
    const created = new this.usuarioModel(usuario);
    return created.save();
  }
}
