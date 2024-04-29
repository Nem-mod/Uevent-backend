import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITicketRepository } from './interfaces/ticket.repository.interface';
import { CreateTicketDto } from './interfaces/dto/create-ticket.dto';
import { ITicket } from './interfaces/ticket.interface';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';
import { Ticket } from './entities/ticket.entity';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';
import { ITicketSearchQuery } from './interfaces/ticket-search-query.interface';
import { ITicketSearchResponse } from './interfaces/ticket-search-response';
import { SearchTicketTypeAndIdDto } from './interfaces/dto/search-ticket-type-and-id.dto';

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

  async getTicketsStatisticByEvent(
    eventId: number,
  ): Promise<ITicketStatistic[]> {
    return await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.type', 'type')
      .addSelect('ticket.cost', 'cost')
      .addSelect('COUNT(ticket.type)', 'overallCount')
      .addSelect('COUNT(ticket.userId)', 'soldCount')
      .where('ticket.eventId = :eventId', { eventId })
      .groupBy('ticket.type')
      .addGroupBy('ticket.cost')
      .getRawMany();
  }

  async getTickets(query: ITicketSearchQuery): Promise<ITicketSearchResponse> {
    const take = query.offset || 10;
    const skip = query.page * take || 0;
    return await this.ticketRepository.findAndCount({
      take: take,
      skip: skip,
      where: {
        event: { id: query.event },
      },
      order: { id: 'DESC' },
    });
  }

  async getAvailableTicketByType(
    typeAndEventId: SearchTicketTypeAndIdDto,
  ): Promise<ITicket> {
    const ticket: ITicket = await this.ticketRepository.findOne({
      where: {
        user: null,
        type: typeAndEventId.type,
        event: { id: typeAndEventId.id },
      },
    });

    console.log(
      await this.ticketRepository.findAll({
        where: {
          user: null,
          type: typeAndEventId.type,
          event: { id: typeAndEventId.id },
        },
      }),
    );

    if (!ticket)
      throw new NotFoundException('Ticket with such type is sold out');

    return ticket;
  }
}
