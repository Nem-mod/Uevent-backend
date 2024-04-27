import { IBaseOrganizationRequest } from './base.organization.request.interface';
import { ICreateEvent } from '../../event/interfaces/create-event.interface';

export interface ICreateEventOrganizationRequest
  extends IBaseOrganizationRequest {
  event: ICreateEvent;
}
