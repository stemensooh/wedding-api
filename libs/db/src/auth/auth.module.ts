import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
