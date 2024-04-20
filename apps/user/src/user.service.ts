import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { FullUserDto } from './dto/full.user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}

  sanitizeUser(user: FullUserDto): FullUserDto {
    const { password, ...rest } = user;
    return rest;
  }

  async createUser(user: CreateUserDto): Promise<FullUserDto> {
    user.password = bcrypt.hashSync(
      user.password,
      this.configService.get('crypt.salt'),
    );

    const newUser: FullUserDto = await this.userRepository.save(
      this.userRepository.create(user),
    );

    return this.sanitizeUser(newUser);
  }

  async getUser(id: number): Promise<FullUserDto> {
    const user: FullUserDto = await this.userRepository.findOneById(id);
    return this.sanitizeUser(user);
  }

  async updateUser(id: number, user: UpdateUserDto) {
    user = this.sanitizeUser(user);

    const updatedUser: FullUserDto = await this.userRepository.update(id, user);

    return this.sanitizeUser(updatedUser);
  }
}
