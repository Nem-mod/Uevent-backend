import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Organization } from '../entities/organization.entity';

export interface IOrganizationRepository
  extends IBaseRepository<Organization> {}
