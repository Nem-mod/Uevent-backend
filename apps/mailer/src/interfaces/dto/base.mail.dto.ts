import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BaseMailDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty() // TODO: Check for replace word
  returnLink: string;
}
