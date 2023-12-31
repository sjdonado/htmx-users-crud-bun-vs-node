import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { EmailWhiteListValidator } from './validators/email-whitelist.validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailValidator: EmailWhiteListValidator
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);
  }

  async validateEmail(email: string): Promise<string | undefined> {
    const isValid = this.emailValidator.validate(email);

    if (!isValid) {
      return this.emailValidator.defaultMessage();
    }

    const user = await this.userRepository.findOne({ where: { email } });

    if (user !== null) {
      return 'Email is already in use.';
    }
  }
}
