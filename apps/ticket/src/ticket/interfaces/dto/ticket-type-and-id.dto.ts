import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TicketTypeAndIdDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  id: number;
}
