import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserVerificationPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number = null;
}
