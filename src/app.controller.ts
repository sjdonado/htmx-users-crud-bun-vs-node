import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  getIndex() {
    return { message: 'Server is running' };
  }
}
