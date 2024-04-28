import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './interfaces/dto/create-organization.dto';
import { FullOrganizationDto } from './interfaces/dto/full-organization.dto';
import { Organization } from './entities/organization.entity';
import { IOrganizationRepository } from './interfaces/organization.repository.interface';
import { User } from '../../../user/src/entities/user.entity';
import { OrganizationMemberService } from '../member/organization-member.service';
import { IOrganizationMember } from '../member/interfaces/organization-member.interface';
import { IOrgIdAndUserId } from './interfaces/org-id-and-user-id.interface';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
    private readonly organizationMemberService: OrganizationMemberService,
  ) {}

  async create(org: CreateOrganizationDto): Promise<FullOrganizationDto> {
    return await this.organizationRepository.save(
      this.organizationRepository.create(org),
    );
  }

  async register(org: CreateOrganizationDto): Promise<FullOrganizationDto> {
    const organization: FullOrganizationDto = await this.create(org);

    await this.setOwner(organization.id, org.owner);

    return organization;
  }

  async getUserRolesInOrganization(ids: IOrgIdAndUserId): Promise<string[]> {
    return await this.organizationMemberService.getUserRolesInOrganization(
      ids.orgId,
      ids.userId,
    );
  }

  async setOwner(orgId: number, userId: number): Promise<void> {
    const org = { id: orgId } as Organization;
    const user = { id: userId } as User;

    await this.organizationMemberService.setOwner(org, user);
  }

  async getUserOrganizations(userId: number): Promise<FullOrganizationDto[]> {
    const members: IOrganizationMember[] =
      await this.organizationMemberService.getUserMembers(userId);

    return members.map((member: IOrganizationMember) => member.organization); // TODO: fetch user role in this organization. Add it in interfaces
  }

  async delete(id: number): Promise<void> {
    await this.organizationRepository.delete({ id });
  }
}
