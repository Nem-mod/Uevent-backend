import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller({
  version: '1',
  path: 'tickets',
})
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('event/:id')
  async getTicketsInfoByEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.ticketService.getTicketsStatisticsByEvent(eventId);
  }
}
