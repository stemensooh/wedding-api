import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '@app/db2/usuario/schemas/usuario.schema';
import { UsuarioService } from './usuario.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuario.name, schema: UsuarioSchema }
    ]),
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        return {
          global: true,
          secret: configService.JWT.SECRET,
          signOptions: { expiresIn: configService.JWT.EXPIRES_IN },
        };
      },
    }),
  ],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
