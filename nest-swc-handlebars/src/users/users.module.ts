import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from './entities/user.entity';
import { EmailWhiteListValidator } from './validators/email-whitelist.validator';
import { BadRequestAlertFilter } from './filters/bad-request.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    EmailWhiteListValidator,
    {
      provide: APP_FILTER,
      useClass: BadRequestAlertFilter,
    },
  ],
})
export class UsersModule {}
