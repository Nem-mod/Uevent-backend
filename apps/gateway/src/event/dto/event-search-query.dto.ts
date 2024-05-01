import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
export class IEventSearchQueryDTO {
  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsNumber()
  @IsOptional()
  page?: number;


  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  organizationId?: number;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string' && value)
      return value.split(',').map(e => Number(e));
    return value;
  })
  format?: number[]

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string' && value)
      return value.split(',').map(e => new Date(e));
    return value;
  })
  date?: Date[]
}
