import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { Organization } from '../entities/organization.entity';
import { Repository } from 'typeorm';
import { IOrganizationRepository } from '../interfaces/organization.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationRepository
  extends BaseTypeormRepository<Organization>
  implements IOrganizationRepository
{
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {
    super(organizationRepository);
  }
}
