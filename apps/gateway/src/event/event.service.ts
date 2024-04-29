import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IEvent } from './interfaces/event.interface';
import { TicketService } from '../ticket/ticket.service';
import { IEventAndTickets } from './interfaces/event-and-tickets.interface';
import { IEventSearchQuery } from './interfaces/event-search-query.interface';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventClient: ClientProxy,
    private readonly ticketService: TicketService,
  ) {}

  async getEventById(id: number): Promise<IEvent> {
    return await lastValueFrom(
      this.eventClient.send<IEvent>({ cmd: 'getEventById' }, id).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async createEventWithTickets(
    orgId: number,
    eventAndTickets: IEventAndTickets,
  ): Promise<IEvent> {
    eventAndTickets.organization = orgId;

    const createdEvent = await lastValueFrom(
      this.eventClient.send<IEvent>({ cmd: 'create' }, eventAndTickets).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );

    try {
      await this.ticketService.createTickets(
        eventAndTickets.tickets,
        createdEvent.id,
      ); // TODO: delete event on ticket error / create 'add tickets to event' endpoint
    } catch (err) {
      console.log('im herreeeeeeeeeeeeeeeeee');
      await this.deleteEvent(createdEvent.id);
      throw err;
    }

    return createdEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    this.eventClient.emit('deleteEvent', id);
  }

  async getEvents(query: IEventSearchQuery) {
    return await lastValueFrom(
      this.eventClient.send<any>({ cmd: 'getEvents' }, query).pipe(
        // TODO: Create interface for this
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async getFormats() {
    return await lastValueFrom(
      this.eventClient.send<IEvent>({ cmd: 'getAllFormats' }, {}).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async getThemes() {
    return await lastValueFrom(
      this.eventClient.send<IEvent>({ cmd: 'getAllThemes' }, {}).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
