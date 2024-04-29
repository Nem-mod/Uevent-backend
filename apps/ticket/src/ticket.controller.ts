import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';
import { ITicketSearchQuery } from './interfaces/ticket-search-query.interface';
import { ITicketSearchResponse } from './interfaces/ticket-search-response';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @MessagePattern({ cmd: 'createTickets' })
  async createTickets(
    ticketsInfoAndId: CreateTicketsAmountAndIdDto,
  ): Promise<true> {
    await this.ticketService.createTickets(ticketsInfoAndId);
    return true;
  }

  @MessagePattern({ cmd: 'getTicketsInfoByEvent' })
  async getTicketsStatisticByEvent(
    eventId: number,
  ): Promise<ITicketStatistic[]> {
    return this.ticketService.getTicketsStatisticByEvent(eventId);
  }

  @MessagePattern({ cmd: 'getTickets' })
  async getTickets(query: ITicketSearchQuery): Promise<ITicketSearchResponse> {
    return this.ticketService.getTickets(query);
  }

  @MessagePattern({ cmd: 'connectTicketToUser' })
  async connectTicketToUser(ticketId: number, userId: number) {}

  @MessagePattern({ cmd: 'getAvaliableTicketByType' })
  async getAvaliableTicketByStatistic() {}
}
