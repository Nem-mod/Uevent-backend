import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller({
  version: '1',
  path: 'tickets',
})
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
}
