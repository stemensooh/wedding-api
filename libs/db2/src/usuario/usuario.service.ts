import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from '@app/db2/usuario/schemas/usuario.schema';
import { Model } from 'mongoose';
import { RegistroUsuarioDto } from '../auth/dto/registro-usuario.dto';
import { Wedding } from '../wedding/schemas/wedding.shema';
import { IUsuario } from './interfaces/usuario.interface';

// export type User = any;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,

    @InjectModel(Wedding.name)
    private weddingModel: Model<Wedding>,
  ) {}

  async findOne(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email: email });
  }

  async validarExistencia(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email: email });
  }

  async crearUsuario(create: RegistroUsuarioDto): Promise<Usuario> {
    const created = new this.usuarioModel(create);
    const usuario = await created.save();

    const weddingCreated = new this.weddingModel({
      idUsuario: usuario.id,
    });

    const wedding = await weddingCreated.save();

    return usuario;
  }

  async obtenerUsuarioSignIn(id: string): Promise<IUsuario> {
    const result = await this.usuarioModel.aggregate([
      {
        $lookup: {
          from: 'weddings',
          localField: '_id',
          foreignField: 'idUsuario',
          as: 'weddings',
        },
      },
      {
        $match: { _id: id },
      },
      // { $project: { weddings: 'weddings' } }
    ]);

    return result?.[0];
  }
}
