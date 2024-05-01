import { Injectable } from '@nestjs/common';
import { IBuyTicketRequest } from '../ticket/interfaces/buy-ticket-request.interface';
import { TicketService } from '../ticket/ticket.service';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly ticketService: TicketService,
  ) {}

  async buyTicket(req: IBuyTicketRequest) {
    const ticket = await this.ticketService.getAvailableTicket(
      req.ticketType,
      req.eventId,
    );

    // await this.ticketService.blockTicket(ticket.id);

    return await this.initStripePayment({
      name: ticket.type,
      cost: ticket.cost,
      quantity: 1,
      successUrl: 'https://google.com',
    });
  }

  async initStripePayment(options: {
    name: string;
    cost: number;
    quantity: number;
    email?: string;
    successUrl: string;
    cancelUrl?: string;
  }): Promise<string> {
    return (
      await this.stripeClient.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: options.name,
              },
              unit_amount: options.cost,
            },
            quantity: options.quantity,
          },
        ],
        mode: 'payment',
        customer_email: options.email,
        success_url: options.successUrl,
        cancel_url: options.cancelUrl,
      })
    ).url;
  }
}
