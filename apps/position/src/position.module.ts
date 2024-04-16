import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { Position } from './entities/position.entity';
import { PositionRepository } from './repositories/position.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([Position]),
  ],
  controllers: [PositionController],
  providers: [
    PositionService,
    { provide: 'IPositionRepository', useClass: PositionRepository },
  ],
})
export class PositionModule {}
