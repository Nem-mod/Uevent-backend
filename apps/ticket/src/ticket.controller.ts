import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @MessagePattern({ cmd: 'createTickets' })
  async createTickets(
    ticketsInfoAndId: CreateTicketsAmountAndIdDto,
  ): Promise<true> {
    console.log(ticketsInfoAndId);
    await this.ticketService.createTickets(ticketsInfoAndId);
    return true;
  }
}
