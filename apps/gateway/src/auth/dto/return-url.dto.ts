import { IsNotEmpty, IsString } from 'class-validator';

export class ReturnUrlDto {
  @IsString()
  @IsNotEmpty() // TODO: Check for replace word
  returnUrl: string;
}
