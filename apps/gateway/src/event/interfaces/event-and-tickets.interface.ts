import { IEvent } from './event.interface';
import { ITickets } from '../../ticket/interfaces/tickets.interface';

export interface IEventAndTickets extends IEvent {
  tickets: ITickets[];
}
