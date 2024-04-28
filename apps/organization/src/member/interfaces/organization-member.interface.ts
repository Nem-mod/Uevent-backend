import { FullOrganizationDto } from '../../organization/interfaces/dto/full-organization.dto';
import { IUser } from './user.interface';
import { IOrganizationRole } from '../../role/interfaces/organization-role.interface';

export interface IOrganizationMember {
  id: number;
  organization: FullOrganizationDto;
  user: IUser;
  role: IOrganizationRole;
}
