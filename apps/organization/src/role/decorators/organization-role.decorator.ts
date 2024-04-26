import { SetMetadata } from '@nestjs/common';

export const OrganizationRole = (...roles: string[]) =>
  SetMetadata('orgRoles', roles);
