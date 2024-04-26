import { OrganizationRole } from '../entities/organization-role.entity';
import { IBaseRepository } from '@app/common/database/base/base.repository.interface';

export interface IOrganizationRoleRepository
  extends IBaseRepository<OrganizationRole> {}
