export interface ITicket {
  // TODO: maybe don't add all fields
  id: number;
  cost: number;
  type: string;
  description: string;
  event: number;
  composted: boolean;
  dateScanned: Date;
}
