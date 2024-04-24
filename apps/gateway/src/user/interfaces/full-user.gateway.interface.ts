import { ICreateUserGateway } from './create-user.gateway.interface';

export interface IFullUserGateway extends ICreateUserGateway {
  id: number;
}
