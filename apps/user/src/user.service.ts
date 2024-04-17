import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async getHello(): Promise<User> {
    return await this.userRepository.save(
      this.userRepository.create({
        username: 'test2',
        email: 'test@test2.test',
        password: 'test',
      }),
    );
  }
}
