import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { LoggerModule } from '@app/common/logger/logger.module';
import { ConfigModule } from '@app/common/config/config.module';
import { UserVerificationMail } from './mail-types/user-verification.mail';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    SendGridModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apikey: configService.get(`api.sendgrid.key`),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailerController],
  providers: [
    MailerService,
    { provide: 'UserVerificationMail', useClass: UserVerificationMail },
  ],
})
export class MailerModule {}
