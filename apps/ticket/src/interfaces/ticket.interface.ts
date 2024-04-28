export interface ITicket {
  id: number;
  cost: number;
  type: string;
  description: string;
  event: {
    id: number;
  };
  composted: boolean;
  dateScanned: Date;
}
