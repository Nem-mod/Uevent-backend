import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { FullUserDto } from './interfaces/dto/full-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './interfaces/dto/update-user.dto';
import { LoginDto } from './interfaces/dto/login.dto';
import { PasswordAndIdDto } from './interfaces/dto/password-and-id.dto';

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

  async createNullUser(email: string): Promise<FullUserDto> {
    const newUser: FullUserDto = await this.userRepository.save(
      this.userRepository.create({ email: email }),
    );

    return this.sanitizeUser(newUser);
  }

  async verifyUser(login: LoginDto) {
    try {
      const user: FullUserDto = await this.getUserByEmail(login.email, false);

      if (bcrypt.compareSync(login.password, user.password))
        return this.sanitizeUser(user);
    } catch (err) {}
    throw new UnauthorizedException('Wrong email or password');
  }

  async getUserById(
    id: number,
    withSanitize: boolean = true,
  ): Promise<FullUserDto> {
    const user: FullUserDto = await this.userRepository.findOneById(id);

    if (!user) throw new NotFoundException(`User with id '${id}' not found`);

    if (!withSanitize) return user;

    return this.sanitizeUser(user);
  }

  async getUserByEmail(
    email: string,
    withSanitize: boolean = true,
  ): Promise<FullUserDto> {
    const user: FullUserDto = await this.userRepository.findOne({
      where: { email },
    });

    if (!user)
      throw new NotFoundException(`User with email '${email}' not found`);

    if (!withSanitize) return user;

    return this.sanitizeUser(user);
  }

  async getAllUsers(): Promise<FullUserDto[]> {
    return await this.userRepository.findAll();
  }

  async changePsw(pswAndId: PasswordAndIdDto): Promise<FullUserDto> {
    pswAndId.password = bcrypt.hashSync(
      pswAndId.password,
      this.configService.get('crypt.salt'),
    );

    const user: FullUserDto = await this.userRepository.save(
      this.userRepository.create(pswAndId),
    );

    return this.sanitizeUser(user);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<FullUserDto> {
    user = this.sanitizeUser(user);

    const updatedUser: FullUserDto = await this.userRepository.update(id, user);

    return this.sanitizeUser(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async setVerifyUser(id: number): Promise<void> {
    const user: FullUserDto = await this.getUserById(id);

    user.verified = true;
    await this.updateUser(user.id, user);
  }
}
