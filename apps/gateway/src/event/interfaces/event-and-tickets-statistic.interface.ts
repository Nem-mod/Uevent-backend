import { IEvent } from './event.interface';
import { ITicketStatistic } from '../../ticket/interfaces/ticket-statistic.interface';

export interface IEventAndTicketsStatistic extends IEvent {
  ticketsStatistic: ITicketStatistic[];
}
