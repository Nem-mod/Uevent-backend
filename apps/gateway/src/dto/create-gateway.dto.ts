import { IsDefined, IsString } from 'class-validator';

export class CreateGatewayDto {
  @IsDefined()
  @IsString()
  name: string;
}
