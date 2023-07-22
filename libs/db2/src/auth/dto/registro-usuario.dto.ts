import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistroUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
