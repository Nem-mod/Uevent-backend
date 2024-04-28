import { Inject, Injectable } from '@nestjs/common';
import { ITicketRepository } from './interfaces/ticket.repository.interface';
import { CreateTicketDto } from './interfaces/dto/create-ticket.dto';
import { ITicket } from './interfaces/ticket.interface';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';

@Injectable()
export class TicketService {
  constructor(
    @Inject('ITicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async createTickets(
    ticketsInfoAndId: CreateTicketsAmountAndIdDto,
  ): Promise<void> {
    for (const ticketsInfo of ticketsInfoAndId.ticketsInfo) {
      try {
        ticketsInfo.ticket.event = ticketsInfoAndId.id;

        for (let i = 0; i < ticketsInfo.amount; i++) {
          await this.createTicket(ticketsInfo.ticket);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  async createTicket(ticket: CreateTicketDto): Promise<ITicket> {
    const event = { id: ticket.event };

    return await this.ticketRepository.save(
      this.ticketRepository.create({ ...ticket, event }),
    );
  }
}
