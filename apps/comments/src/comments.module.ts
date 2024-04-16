import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from './repositories/comment.repository';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([Comment]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    { provide: `ICommentRepository`, useClass: CommentRepository },
  ],
})
export class CommentsModule {}
