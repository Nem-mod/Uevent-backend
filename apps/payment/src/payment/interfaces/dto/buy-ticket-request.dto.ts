import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BuyTicketRequestDto {
  @IsString()
  @IsNotEmpty()
  ticketType: string;

  @IsNumber()
  eventId: number;

  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  returnLink: string;

  @IsString()
  @IsNotEmpty()
  successUrl: string;

  @IsOptional()
  @IsString()
  cancelUrl: string;
}
