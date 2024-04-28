import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTicketsAmountDto } from './create-tickets-amount.dto';

export class CreateTicketsAmountAndIdDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketsAmountDto)
  ticketsInfo: CreateTicketsAmountDto[];

  @IsNumber()
  id: number;
}
