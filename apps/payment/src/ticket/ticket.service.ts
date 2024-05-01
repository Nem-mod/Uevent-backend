import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ITicket } from './interfaces/ticket.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ITicketTypeAndEventId } from './interfaces/ticket-type-and-event-id.interface';
import { ITicketIdAndUserId } from './interfaces/ticket-id-and-user-id.interface';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketClient: ClientProxy,
  ) {}

  async getAvailableTicket(type: string, id: number): Promise<ITicket> {
    const typeAndEventId: ITicketTypeAndEventId = { type, id };

    return await lastValueFrom(
      this.ticketClient
        .send<ITicket>({ cmd: 'getAvailableTicketByType' }, typeAndEventId)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async unblockTicket(ticketId: number): Promise<void> {
    this.ticketClient.emit('setTicketAvailable', ticketId);
  }

  async blockTicket(ticketId: number, userId: number): Promise<void> {
    const hui: ITicketIdAndUserId = {
      ticketId,
      userId,
    };

    await lastValueFrom(
      this.ticketClient.send<true>({ cmd: 'setTicketProcessing' }, hui).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async setTicketSoldAndGetToken(ticketId: number): Promise<string> {
    return await lastValueFrom(
      this.ticketClient.send<string>({ cmd: 'setTicketSold' }, ticketId).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
