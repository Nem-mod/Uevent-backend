import {
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { BuyTicketRequestDto } from './interfaces/dto/buy-ticket-request.dto';
import { MessagePattern } from '@nestjs/microservices';
import { HttpToRpcExceptionFilter } from './http-to-rpc.exception.filter';

@UsePipes(
  new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
@UseFilters(new HttpToRpcExceptionFilter())
@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'startBuyTicket' })
  async buyTicket(req: BuyTicketRequestDto): Promise<string> {
    return await this.paymentService.buyTicket(req);
  }
}
