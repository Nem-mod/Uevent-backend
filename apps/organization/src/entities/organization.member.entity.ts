import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Organization } from './organization.entity';
import { User } from '../../../user/src/entities/user.entity';
import { OrganizationRole } from './organization.role.entity';

@Entity()
export class OrganizationMember extends AbstractEntity {
  @Column({ type: 'int' })
  organization!: Organization;

  @Column({ type: 'int' })
  user!: User;

  @ManyToOne(() => OrganizationRole, { eager: true })
  role!: OrganizationRole;
}
