import { HttpException, Injectable } from '@nestjs/common';
import { TicketService } from '../ticket/ticket.service';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { MailerService } from '../mailer/mailer.service';
import { BuyTicketRequestDto } from './interfaces/dto/buy-ticket-request.dto';
import { ITicketReceiptMail } from '../mailer/interfaces/ticket-receipt-mail.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly ticketService: TicketService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async buyTicket(req: BuyTicketRequestDto) {
    const ticket = await this.ticketService.getAvailableTicket(
      req.ticketType,
      req.eventId,
    );
    const user: IUser = await this.userService.getUserById(req.userId);

    await this.ticketService.blockTicket(ticket.id, req.userId);

    const checkout: Stripe.Checkout.Session = await this.initStripePayment({
      name: ticket.type,
      cost: ticket.cost,
      quantity: 1,
      email: user.email,
      successUrl: req.successUrl,
      cancelUrl: req.cancelUrl,
      metadata: {
        ticketId: ticket.id,
        email: user.email,
        returnLink: req.returnLink,
      },
    });

    console.log(checkout.id); // TODO: delete

    return checkout.client_secret;
  }

  async completePayment(
    ticketId: number,
    email: string,
    returnLink: string,
  ): Promise<string> {
    const token: string =
      await this.ticketService.setTicketSoldAndGetToken(ticketId);
    const mailInfo: ITicketReceiptMail = {
      email,
      returnLink,
      token,
    };

    await this.mailerService.sendTicketReceiptEmail(mailInfo);

    return token;
  }

  async unblockTicket(ticketId: number): Promise<void> {
    await this.ticketService.unblockTicket(ticketId);
  }

  async initStripePayment(options: {
    name: string;
    cost: number;
    quantity: number;
    email?: string;
    successUrl: string;
    cancelUrl?: string;
    metadata: {
      ticketId: number;
      email: string;
      returnLink: string;
    };
  }): Promise<Stripe.Checkout.Session> {
    try {
      return await this.stripeClient.checkout.sessions.create({
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
        ui_mode: 'embedded',
        customer_email: options.email,
        return_url: options.successUrl,
        // cancel_url: options.cancelUrl,
        expires_at: Math.ceil(
          new Date().getTime() / 1000 +
            Number(
              this.configService.get<number>(
                'api.stripe.payment_link_expire_seconds',
              ),
            ),
        ),
        metadata: options.metadata,
      });
    } catch (err:
      | { type: Stripe.RawErrorType; raw: Stripe.StripeRawError }
      | any) {
      console.log('HEREEE');
      throw new HttpException(err.raw.message, err.raw.statusCode);
    }
  }
}
