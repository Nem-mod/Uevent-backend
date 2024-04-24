import { IsNotEmpty, IsString } from 'class-validator';

export class TokenAndIdDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
