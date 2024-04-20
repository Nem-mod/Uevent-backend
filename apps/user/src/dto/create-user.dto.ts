import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  username: string;

  @IsEmail()
  @Length(5, 100)
  email: string;

  @IsString()
  @Length(2, 72) // TODO: change min length to 6 or more
  password: string;
}
