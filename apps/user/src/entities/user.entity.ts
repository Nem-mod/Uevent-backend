import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { OrganizationMember } from '../../../organization/src/entities/organization.member.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 40 })
  username!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 72 })
  password!: string;

  @OneToMany(
    () => OrganizationMember,
    (organizationMembership) => organizationMembership.user,
  )
  organizationMemberships: OrganizationMember[];
}
