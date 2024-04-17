import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Validate } from 'class-validator';
import { Position } from '../../../position/src/entities/position.entity';
import { OrganizationMember } from './organization.member.entity';

@Entity()
export class Organization extends AbstractEntity {
  @Column({ type: 'varchar', length: 200, unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  phoneNumber: string;

  @Validate((org: Organization) => {
    if (!org.email && !org.phoneNumber)
      throw new Error('Organization must have either email or phoneNumber');
  })
  validation: null;

  @Column({ type: 'varchar', length: 255 })
  fopIdentifier!: string;

  @OneToMany(
    () => OrganizationMember,
    (OrganizationMember) => OrganizationMember.organization,
  )
  members: OrganizationMember[];

  @ManyToOne(() => Position)
  location: Position;
}
