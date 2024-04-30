import { IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class IEventSearchQuery {
  @IsOptional()
  offset?: number;

  @IsOptional()
  page?: number;

  @IsOptional()
  organizationId?: number;


  @IsOptional()
  format?: number[];


  @IsOptional()
  @Transform((({ value }) : TransformFnParams => value.map(e => new Date(e)) ))
  date?: Date[]
}
