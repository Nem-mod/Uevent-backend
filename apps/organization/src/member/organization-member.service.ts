import { Inject, Injectable } from '@nestjs/common';
import { IOrganizationMemberRepository } from './interfaces/organization-member.repository.interface';
import { Organization } from '../organization/entities/organization.entity';
import { User } from '../../../user/src/entities/user.entity';
import { IOrganizationMember } from './interfaces/organization-member.interface';
import { OrganizationRoleService } from '../role/organization-role.service';

@Injectable()
export class OrganizationMemberService {
  constructor(
    @Inject('IOrganizationMemberRepository')
    private readonly organizationMemberRepository: IOrganizationMemberRepository,
    private readonly organizationRoleService: OrganizationRoleService,
  ) {}

  async setOwner(org: Organization, user: User): Promise<IOrganizationMember> {
    const ownerRole = await this.organizationRoleService.getOwnerRole();

    return await this.organizationMemberRepository.save(
      this.organizationMemberRepository.create({
        organization: org,
        user: user,
        role: ownerRole,
      }),
    );
  }
}
