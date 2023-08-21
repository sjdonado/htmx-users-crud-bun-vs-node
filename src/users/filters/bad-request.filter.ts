import {
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Response } from 'express';

@Catch(HttpException)
export class BadRequestAlertFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof BadRequestException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      response.header('HX-Trigger', '');
      response.header('HX-Refresh', '');
    }
    super.catch(exception, host);
  }
}
