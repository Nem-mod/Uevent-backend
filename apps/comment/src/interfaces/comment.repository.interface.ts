import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Comment } from '../entities/comment.entity';

export interface ICommentRepository extends IBaseRepository<Comment> {}
