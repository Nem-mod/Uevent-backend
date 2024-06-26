import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';
import { ITicketSearchQuery } from './interfaces/ticket-search-query.interface';
import { ITicketSearchResponse } from './interfaces/ticket-search-response';
import { ITicket } from './interfaces/ticket.interface';
import { TicketTypeAndIdDto } from './interfaces/dto/ticket-type-and-id.dto';
import { ITicketIdAndUserId } from './interfaces/ticket-id-and-user-id.interface';

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

  @MessagePattern({ cmd: 'getAvailableTicketByType' })
  async getAvailableTicketByType(
    typeAndEventId: TicketTypeAndIdDto,
  ): Promise<ITicket> {
    // const ticketAndUserIds: ITicketIdAndUserId = {
    //   ticketId: typeAndEventId.id,
    //   userId: Number(typeAndEventId.type),
    // };
    // return await this.ticketService.setTicketAsAvailable(typeAndEventId.id); // TODO: for test. delete
    // return await this.ticketService.setTicketAsProcessing(ticketAndUserIds); // TODO: for test. delete
    // return await this.ticketService.setTicketAsSold(typeAndEventId.id); // TODO: for test. delete
    // await this.ticketService.compostTicket(typeAndEventId.type);

    return await this.ticketService.getAvailableTicketByType(typeAndEventId);
  }

  @EventPattern('setTicketAvailable')
  async setTicketAsAvailable(ticketId: number): Promise<void> {
    await this.ticketService.setTicketAsAvailable(ticketId);
  }

  @MessagePattern({ cmd: 'setTicketProcessing' })
  async setTicketAsProcessing(
    ticketAndUserIds: ITicketIdAndUserId,
  ): Promise<true> {
    await this.ticketService.setTicketAsProcessing(ticketAndUserIds);
    return true;
  }

  @MessagePattern({ cmd: 'setTicketSold' })
  async setTicketAsSold(ticketId: number): Promise<string> {
    return await this.ticketService.setTicketAsSold(ticketId);
  }

  @MessagePattern({ cmd: 'scanTicket' })
  async scanTicket(token: string): Promise<ITicket> {
    return await this.ticketService.scanTicket(token);
  }

  @EventPattern('compostTicket')
  async compostTicket(token: string): Promise<void> {
    await this.ticketService.compostTicket(token);
  }
}
