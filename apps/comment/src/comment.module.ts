import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './repositories/comment.repository';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Comment]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    { provide: `ICommentRepository`, useClass: CommentRepository },
  ],
})
export class CommentModule {}
