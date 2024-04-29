import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchTicketTypeAndIdDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  id: number;
}
