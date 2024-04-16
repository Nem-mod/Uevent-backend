import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { ConfigModule } from '@app/common/config/config.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { Organization } from './entities/organization.entity';
import { LoggerModule } from '@app/common/logger/logger.module';
import { OrganizationRepository } from './repositories/organization.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([Organization]),
  ],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService,
    { provide: `IOrganizationsRepository`, useClass: OrganizationRepository },
  ],
})
export class OrganizationsModule {}
