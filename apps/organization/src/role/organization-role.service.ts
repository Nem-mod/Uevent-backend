import { Inject, Injectable } from '@nestjs/common';
import { IOrganizationRoleRepository } from './interfaces/organization-role.repository.interface';
import { IOrganizationRole } from './interfaces/organization-role.interface';

@Injectable()
export class OrganizationRoleService {
  constructor(
    @Inject('IOrganizationRoleRepository')
    private readonly organizationRoleRepository: IOrganizationRoleRepository,
  ) {}

  async getOwnerRole(): Promise<IOrganizationRole> {
    return await this.organizationRoleRepository.findOne({
      where: { name: 'owner' },
    });
  }

  async getModeratorRole(): Promise<IOrganizationRole> {
    return await this.organizationRoleRepository.findOne({
      where: { name: 'moderator' },
    });
  }

  async addRole(name: string): Promise<IOrganizationRole> {
    return await this.organizationRoleRepository.save(
      this.organizationRoleRepository.create({ name }),
    );
  }

  async deleteRole(id: number): Promise<void> {
    return await this.organizationRoleRepository.delete({ id });
  }
}
