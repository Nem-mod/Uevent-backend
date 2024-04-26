import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { OrganizationRole } from '../entities/organization-role.entity';
import { IOrganizationRoleRepository } from '../interfaces/organization-role.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationRoleRepository
  extends BaseTypeormRepository<OrganizationRole>
  implements IOrganizationRoleRepository
{
  constructor(
    @InjectRepository(OrganizationRole)
    private readonly organizationRoleRepository: Repository<OrganizationRole>,
  ) {
    super(organizationRoleRepository);
  }
}
