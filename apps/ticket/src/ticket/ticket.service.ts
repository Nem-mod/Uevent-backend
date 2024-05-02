import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITicketRepository } from './interfaces/ticket.repository.interface';
import { CreateTicketDto } from './interfaces/dto/create-ticket.dto';
import { ITicket } from './interfaces/ticket.interface';
import { CreateTicketsAmountAndIdDto } from './interfaces/dto/create-tickets-amount-and-id.dto';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';
import { ITicketSearchQuery } from './interfaces/ticket-search-query.interface';
import { ITicketSearchResponse } from './interfaces/ticket-search-response';
import { TicketTypeAndIdDto } from './interfaces/dto/ticket-type-and-id.dto';
import { ITicketIdAndUserId } from './interfaces/ticket-id-and-user-id.interface';
import { TokenService } from '../token/token.service';
import { Ticket } from './entities/ticket.entity';
import { Event } from '../../../event/src/event/entities/event.entity';
import { TicketStatus } from './interfaces/enums/ticket-status.enum';

@Injectable()
export class TicketService {
  constructor(
    @Inject('ITicketRepository')
    private readonly ticketRepository: ITicketRepository,
    private readonly tokenService: TokenService,
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
    const event = { id: ticket.event } as Event;

    return this.ticketRepository.create({ ...ticket, event });
  }

  async saveTickets(ticket: ITicket[]): Promise<ITicket[]> {
    return await this.ticketRepository.saveMany(ticket as unknown as Ticket[]);
  }

  async scanTicket(token: string): Promise<ITicket> {
    const { id: ticketId } = await this.tokenService.verifyToken(token);

    return await this.getTicketById(ticketId);
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
        user: { id: query.user },
      },
      order: { id: 'DESC' },
    });
  }

  async getTicketById(ticketId: number): Promise<ITicket> {
    const ticket = await this.ticketRepository.findOneById(ticketId);

    if (!ticket)
      throw new NotFoundException(`Ticket with id ${ticketId} not found`);

    return ticket;
  }

  async setTicketAsAvailable(ticketId: number): Promise<ITicket> {
    return await this.ticketRepository.update(ticketId, {
      user: null,
      sold: false,
      composted: false,
      dateComposted: null,
      status: TicketStatus.AVAILABLE,
    });
  }

  async setTicketAsProcessing(
    ticketsInfoAndId: ITicketIdAndUserId,
  ): Promise<ITicket> {
    const ticket = await this.getTicketById(ticketsInfoAndId.ticketId);

    if (ticket.status !== TicketStatus.AVAILABLE)
      throw new ForbiddenException('Ticket is not available');

    return await this.ticketRepository.update(ticketsInfoAndId.ticketId, {
      user: { id: ticketsInfoAndId.userId },
      status: TicketStatus.PROCESSING,
    });
  }

  async setTicketAsSold(ticketId: number): Promise<string> {
    const ticket = await this.ticketRepository.findOneById(ticketId);

    if (ticket.status !== TicketStatus.PROCESSING)
      throw new ForbiddenException('Ticket must be processing to be sold');

    await this.ticketRepository.update(ticketId, {
      sold: true,
      status: TicketStatus.SOLD,
    });

    return await this.tokenService.signToken(ticket.id);
  }

  async compostTicket(token: string): Promise<void> {
    const { id: ticketId } = await this.tokenService.verifyToken(token);
    const ticket: ITicket = await this.getTicketById(ticketId);

    await this.ticketRepository.update(ticket.id, {
      composted: true,
      dateComposted: new Date(),
      status: TicketStatus.COMPOSTED,
    });
  }

  async getAvailableTicketByType(
    typeAndEventId: TicketTypeAndIdDto,
  ): Promise<ITicket> {
    const ticket: ITicket = await this.ticketRepository.findOne({
      where: {
        status: TicketStatus.AVAILABLE,
        type: typeAndEventId.type,
        event: { id: typeAndEventId.id },
      },
    });

    if (!ticket)
      throw new NotFoundException('Ticket with such type is sold out');

    return ticket;
  }
}
