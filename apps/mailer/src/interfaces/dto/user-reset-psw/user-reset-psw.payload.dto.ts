import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserResetPswPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  id: number = null;
}
