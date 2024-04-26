import { Inject, Injectable } from '@nestjs/common';
import { IOrganizationRoleRepository } from './interfaces/organization-role.repository.interface';

@Injectable()
export class OrganizationRoleService {
  constructor(
    @Inject('IOrganizationRoleRepository')
    private readonly organizationRoleRepository: IOrganizationRoleRepository,
  ) {}

  async getOwnerRole() {
    return await this.organizationRoleRepository.findOne({
      where: { name: 'owner' },
    });
  }

  async getModeratorRole() {
    return await this.organizationRoleRepository.findOne({
      where: { name: 'moderator' },
    });
  }

  async addRole(name: string) {
    return await this.organizationRoleRepository.save(
      this.organizationRoleRepository.create({ name }),
    );
  }

  async deleteRole(id: number) {
    return await this.organizationRoleRepository.delete({ id });
  }
}
