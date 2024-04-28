import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserVerificationPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  id: number = null;
}
