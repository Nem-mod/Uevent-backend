import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { FullUserDto } from './dto/full.user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}

  async createUser(user: CreateUserDto): Promise<FullUserDto> {
    user.password = bcrypt.hashSync(
      user.password,
      this.configService.get('crypt.salt'),
    );

    return this.userRepository.save(this.userRepository.create(user));
  }
}
