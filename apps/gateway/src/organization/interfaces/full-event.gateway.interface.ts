import { ICreateEventGateway } from './create-event.gateway.interface';

export interface IFullEventGateway extends ICreateEventGateway {
  id: number;
}
