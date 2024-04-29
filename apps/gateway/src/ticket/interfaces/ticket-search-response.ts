import { ITicket } from './ticket.interface';

export interface ITicketSearchResponse {
  data: ITicket[];
  count: number;
}
