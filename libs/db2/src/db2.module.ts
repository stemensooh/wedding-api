import { Module } from '@nestjs/common';
import { WeddingCustomeModule } from './wedding/wedding.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WeddingCustomeModule, AuthModule, UsuarioModule],
  exports: [WeddingCustomeModule, AuthModule, UsuarioModule],
})
export class Db2Module {}
