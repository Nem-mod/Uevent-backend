import { IFullUserGateway } from './interfaces/full-user.gateway.interface';

declare global {
  namespace Express {
    interface User extends IFullUserGateway {}
  }
}
