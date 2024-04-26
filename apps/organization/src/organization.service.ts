import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { FullOrganizationDto } from './dto/full-organization.dto';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: Repository<Organization>,
    // TODO: create OrganizationMemberService
  ) {}

  async create(org: CreateOrganizationDto): Promise<FullOrganizationDto> {
    return await this.organizationRepository.save(
      this.organizationRepository.create(org),
    );
  }

  async register(org: CreateOrganizationDto): Promise<FullOrganizationDto> {
    return await this.create(org);
    // TODO: attach owner to org member
  }
}
