import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserModule {}
