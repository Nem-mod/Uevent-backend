import { CreateTicketDto } from './create-ticket.dto';
import { IsNumber, IsObject, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketsAmountDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateTicketDto)
  ticket: CreateTicketDto;

  @IsNumber()
  @Min(1)
  amount: number;
}
