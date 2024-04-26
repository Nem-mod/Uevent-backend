import { Module } from '@nestjs/common';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { ConfigModule } from '@app/common/config/config.module';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { Organization } from './organization/entities/organization.entity';
import { LoggerModule } from '@app/common/logger/logger.module';
import { OrganizationRepository } from './organization/repositories/organization.repository';
import { OrganizationMemberRepository } from './member/repositories/organization-member.repository';
import { OrganizationRoleRepository } from './role/repositories/organization-role.repository';
import { OrganizationMemberService } from './member/organization-member.service';
import { OrganizationRoleService } from './role/organization-role.service';
import { OrganizationMember } from './member/entities/organization-member.entity';
import { OrganizationRole } from './role/entities/organization-role.entity';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([
      Organization,
      OrganizationMember,
      OrganizationRole,
    ]),
  ],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    OrganizationMemberService,
    OrganizationRoleService,
    { provide: `IOrganizationRepository`, useClass: OrganizationRepository },
    {
      provide: `IOrganizationMemberRepository`,
      useClass: OrganizationMemberRepository,
    },
    {
      provide: `IOrganizationRoleRepository`,
      useClass: OrganizationRoleRepository,
    },
  ],
})
export class OrganizationModule {}
