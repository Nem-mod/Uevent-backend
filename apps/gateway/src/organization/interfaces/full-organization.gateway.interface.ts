import { ICreateOrganizationGateway } from './create-organization.gateway.interface';

export interface IFullOrganizationGateway extends ICreateOrganizationGateway {
  id: number;
}
