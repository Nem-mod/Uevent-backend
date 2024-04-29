import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';

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

  @MessagePattern({ cmd: 'getTicketsInfoByEvent' })
  async getTicketsInfoByEvent(eventId: number): Promise<ITicketStatistic[]> {
    return this.ticketService.getTicketsInfoByEvent(eventId);
  }
}
