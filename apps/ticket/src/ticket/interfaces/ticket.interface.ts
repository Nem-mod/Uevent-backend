import { TicketStatus } from './enums/ticket-status.enum';

export interface ITicket {
  id: number;
  cost: number;
  type: string;
  description: string;
  sold: boolean;
  eventId: number;
  userId: number;
  composted: boolean;
  dateComposted: Date;
  status: TicketStatus;
}
