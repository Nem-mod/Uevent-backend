import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { GatewayRepository } from './repositories/gateway.repository';
import { Gateway } from './entities/gateway.entity';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    DatabaseModule.forFeature([Gateway]),
    LoggerModule,
  ],
  providers: [
    GatewayService,
    { provide: `IGatewayRepository`, useClass: GatewayRepository },
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
