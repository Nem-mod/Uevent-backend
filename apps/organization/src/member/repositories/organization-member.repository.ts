import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { OrganizationMember } from '../entities/organization-member.entity';
import { IOrganizationMemberRepository } from '../interfaces/organization-member.repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationMemberRepository
  extends BaseTypeormRepository<OrganizationMember>
  implements IOrganizationMemberRepository
{
  constructor(
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) {
    super(organizationMemberRepository);
  }
}
