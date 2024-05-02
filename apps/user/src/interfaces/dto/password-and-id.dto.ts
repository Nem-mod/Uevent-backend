import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PasswordAndIdDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty() // TODO: strong password
  password: string;
}
