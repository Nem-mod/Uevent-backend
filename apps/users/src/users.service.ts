import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUserRepository,
  ) {}

  async getHello(): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create({
        username: 'test',
        email: 'test@test.test',
        password: 'test',
      }),
    );
  }
}
