import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { User } from '../../../../user/src/entities/user.entity';
import { OrganizationRole } from '../../role/entities/organization-role.entity';

@Entity()
export class OrganizationMember extends AbstractEntity {
  @ManyToOne(() => Organization, { eager: true, onDelete: 'CASCADE' })
  organization!: Organization;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => OrganizationRole, { eager: true })
  role!: OrganizationRole;
}
