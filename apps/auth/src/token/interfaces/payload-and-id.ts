import { IId } from './id.interface';

export interface IPayloadAndId extends IId {
  payload: object;
}
