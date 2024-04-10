import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import pretty from 'pino-pretty';

const stream = pretty({
  levelFirst: true,
  colorize: true,
  singleLine: true,
});

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        stream,
      },
    }),
  ],
})
export class LoggerModule {}
