import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async buyTicket(): Promise<string> {
    return await this.paymentService.buyTicket({
      ticketType: 'Premium',
      eventId: 47,
      userId: 1,
    });
  }
}
