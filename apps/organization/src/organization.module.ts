import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { ConfigModule } from '@app/common/config/config.module';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { Organization } from './entities/organization.entity';
import { LoggerModule } from '@app/common/logger/logger.module';
import { OrganizationRepository } from './repositories/organization.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Organization]),
  ],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    { provide: `IOrganizationRepository`, useClass: OrganizationRepository },
  ],
})
export class OrganizationModule {}
