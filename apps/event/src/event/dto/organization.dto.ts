import { IsDefined, IsNumber } from 'class-validator';

export class OrganizationDto {
  @IsNumber()
  @IsDefined()
  id: number;
}
