import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { Position } from './entities/position.entity';
import { PositionRepository } from './repositories/position.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Position]),
  ],
  controllers: [PositionController],
  providers: [
    PositionService,
    { provide: 'IPositionRepository', useClass: PositionRepository },
  ],
})
export class PositionModule {}
