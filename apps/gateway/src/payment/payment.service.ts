import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IBuyTicketRequest } from './interfaces/buy-ticket-request.interface';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  async getTicketPaymentLink(
    userId: number,
    eventId: number,
    ticketType: string,
    returnLink: string,
  ): Promise<string> {
    const req: IBuyTicketRequest = {
      userId,
      eventId,
      ticketType,
      returnLink,
    };

    return await lastValueFrom(
      this.paymentClient.send<string>({ cmd: 'startBuyTicket' }, req).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
