import { User } from '../entities/user.entity';
import { IBaseRepository } from '@app/common/database/base/base.repository.interface';

export interface IUserRepository extends IBaseRepository<User> {}
