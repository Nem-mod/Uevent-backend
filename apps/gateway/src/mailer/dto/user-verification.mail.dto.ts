import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserVerificationMailDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  returnLink: string;
}
