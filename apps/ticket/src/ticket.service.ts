import { Inject, Injectable } from '@nestjs/common';
import { ITicketRepository } from './interfaces/ticket.repository.interface';
import { CreateTicketDto } from './interfaces/dto/create-ticket.dto';
import { ITicket } from './interfaces/ticket.interface';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @Inject('ITicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async createTickets(
    ticketsInfoAndId: CreateTicketsAmountAndIdDto,
  ): Promise<void> {
    const ticketsArr: ITicket[] = [];

    for (const ticketsInfo of ticketsInfoAndId.ticketsInfo) {
      try {
        ticketsInfo.ticket.event = ticketsInfoAndId.id;

        for (let i = 0; i < ticketsInfo.amount; i++) {
          ticketsArr.push(await this.createTicket(ticketsInfo.ticket));
        }

        await this.saveTickets(ticketsArr);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  async createTicket(ticket: CreateTicketDto): Promise<ITicket> {
    const event = { id: ticket.event };

    return this.ticketRepository.create({ ...ticket, event });
  }

  async saveTickets(ticket: ITicket[]): Promise<ITicket[]> {
    return await this.ticketRepository.saveMany(ticket as unknown as Ticket[]);
  }
}
