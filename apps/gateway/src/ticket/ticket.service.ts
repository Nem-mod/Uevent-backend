import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { ITickets } from './interfaces/tickets.interface';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketClient: ClientProxy,
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
            console.log(val);
            throw new RpcException(val);
          }),
        ),
    );
  }
}
