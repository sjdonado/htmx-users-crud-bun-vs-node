import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/users/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedDatabaseWithUsers(count: number) {
    const usersCount = await this.userRepository.count();

    const usersToSeed = Array.from({ length: count }, (_, index) => ({
      email: `test${usersCount + index + 1}@example.com`,
      hash: this.generateRandomHash(),
      counter: this.generateRandomCounter(),
    }));

    await this.userRepository.save(usersToSeed);
  }

  private generateRandomHash(): string {
    const characters = 'ABCabc0123456789!@#$%^&*()_+{}[]:;<>,.?~=-';
    const length = 10;
    let randomHash = '';
    for (let i = 0; i < length; i++) {
      randomHash += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return randomHash;
  }

  private generateRandomCounter(): number {
    return Math.floor(Math.random() * 1000);
  }
}
