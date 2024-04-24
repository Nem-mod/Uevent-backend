import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class PayloadAndIdDto {
  @IsObject()
  payload: object;

  @IsString()
  @IsNotEmpty()
  id: string;
}
