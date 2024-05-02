import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional() // TODO: maybe set required
  @IsString()
  description?: string;

  @IsDate() // TODO: check another project how to convert date
  startTime: Date;

  @IsOptional() // TODO: maybe set required
  @IsNumber()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsString()
  poster: string;

  @IsNumber()
  organization: number;

  @IsArray()
  @IsNumber({}, { each: true })
  themes: number[];

  @IsNumber()
  format: number;

  @IsString()
  @IsNotEmpty()
  locationStr: string;
}
