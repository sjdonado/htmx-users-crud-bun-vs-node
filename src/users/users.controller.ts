import {
  Controller,
  HttpCode,
  Logger,
  Get,
  Post,
  Patch,
  Delete,
  Header,
  Body,
  Param,
  Render,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async indexPage(@Res() res: Response) {
    const users = await this.usersService.findAll();

    return res.render('users/index', {
      layout: 'main',
      users,
    });
  }

  @Get('views/create')
  @Render('partials/_create-user-modal')
  async createUserModal() {
    return {};
  }

  @Get('views/edit/:id')
  @Render('partials/_edit-users-list-row.hbs')
  async editUserRow(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return { user };
  }

  @Get('views/edit/cancel/:id')
  @Render('partials/_users-list-row')
  async cancelEditRow(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return { user };
  }

  @Post('validation/email')
  @Render('partials/_email-inline-validation')
  async emailValidation(@Body() { email }: { email: string }) {
    const errorMessage = await this.usersService.validateEmail(email);

    return { email, errorMessage };
  }

  @Post()
  @HttpCode(201)
  @Render('partials/_users-list-row')
  @Header('HX-Trigger', 'close-create-user-modal')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    this.logger.log(`Created user: ${JSON.stringify(user)}`);

    return { user };
  }

  @Patch(':id')
  @Render('partials/_users-list-row')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    this.logger.log(`Updated user: ${JSON.stringify(user)}`);
    return { user };
  }

  @Delete(':id')
  @Header('HX-Refresh', 'true')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
