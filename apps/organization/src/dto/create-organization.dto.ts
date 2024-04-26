import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  fopIdentifier: string;

  @IsNumber()
  @IsNotEmpty()
  owner: number;
}
