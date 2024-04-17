import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { ICommentRepository } from '../interfaces/comment.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository
  extends BaseTypeormRepository<Comment>
  implements ICommentRepository
{
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {
    super(commentRepository);
  }
}
