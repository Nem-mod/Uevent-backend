import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { OrganizationMember } from '../entities/organization-member.entity';

export interface IOrganizationMemberRepository
  extends IBaseRepository<OrganizationMember> {}
