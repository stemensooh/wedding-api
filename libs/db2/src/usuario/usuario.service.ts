import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from '@app/db2/usuario/schemas/usuario.schema';
import { Model } from 'mongoose';
import { RegistroUsuarioDto } from '../auth/dto/registro-usuario.dto';

// export type User = any;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,
  ) {}

  async findOne(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email: email });
  }

  async validarExistencia(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email: email });
  }

  async crearUsuario(usuario: RegistroUsuarioDto): Promise<Usuario> {
    const created = new this.usuarioModel(usuario);
    return created.save();
  }
}
