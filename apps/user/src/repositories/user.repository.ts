import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository
  extends BaseTypeormRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
