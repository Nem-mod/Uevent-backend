import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { ITickets } from './interfaces/tickets.interface';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';
import { ITicketSearchQuery } from './interfaces/ticket-search-query.interface';
import { ITicketSearchResponse } from './interfaces/ticket-search-response';
import { ITicket } from './interfaces/ticket.interface';
import { IEventIdAndTicketType } from './interfaces/event-id-and-ticket-type.interface';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketClient: ClientProxy,
    private readonly paymentService: PaymentService,
  ) {}

  async createTickets(ticketsInfo: ITickets[], eventId: number): Promise<void> {
    await lastValueFrom(
      this.ticketClient
        .send<boolean>({ cmd: 'createTickets' }, { ticketsInfo, id: eventId })
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async getTicketsStatisticsByEvent(
    eventId: number,
  ): Promise<ITicketStatistic[]> {
    return await lastValueFrom(
      this.ticketClient
        .send<ITicketStatistic[]>({ cmd: 'getTicketsInfoByEvent' }, eventId)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async getTickets(query: ITicketSearchQuery): Promise<ITicketSearchResponse> {
    return await lastValueFrom(
      this.ticketClient
        .send<ITicketSearchResponse>({ cmd: 'getTickets' }, query)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async getTicketByType(eventId: number, type: string): Promise<ITicket> {
    const eventIdAndType: IEventIdAndTicketType = { id: eventId, type };

    return await lastValueFrom(
      this.ticketClient
        .send<ITicket>({ cmd: 'getAvailableTicketByType' }, eventIdAndType)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async buyAvailableTicket(
    userId: number,
    eventId: number,
    type: string,
    returnLink: string,
  ): Promise<string> {
    return await this.paymentService.getTicketPaymentLink(
      userId,
      eventId,
      type,
      returnLink,
    );
  }
}
