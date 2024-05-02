import { IPaymentLinkLinks } from './payment-link-links.interface';

export interface IBuyTicketRequest extends IPaymentLinkLinks {
  ticketType: string;
  eventId: number;
  userId: number;
  returnLink: string;
}
