import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { OrganizationMemberRole } from '../interfaces/organization.member.enum';
import { Organization } from './organization.entity';
import { User } from '../../../user/src/entities/user.entity';

@Entity()
export class OrganizationMember extends AbstractEntity {
  @Column({ type: 'int' })
  organization: Organization;

  @Column({ type: 'int' })
  user: User;

  @Column({ type: 'enum', enum: OrganizationMemberRole })
  role!: string; // TODO: change to table
}
