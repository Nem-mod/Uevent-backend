import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
export class IEventSearchQueryDTO {
  @IsNumber()
  @IsOptional()
  offset: number;

  @IsNumber()
  @IsOptional()
  page: number;

  // format: number[]

  // @IsArray()
  // @Type(() => Date)
  // @IsDate({ each: true })

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string' && value)
      return value.split(',').map(e => new Date(e));
    return value;
  })
  date: Date[]
}
