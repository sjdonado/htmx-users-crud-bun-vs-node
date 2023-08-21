import { Controller, Post } from '@nestjs/common';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async seedDatabase() {
    await this.seedService.seedDatabaseWithUsers(100);
    return { message: 'Database seeded successfully with users.' };
  }
}
