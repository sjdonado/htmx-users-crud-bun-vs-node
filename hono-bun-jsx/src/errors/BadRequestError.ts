import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  constructor(message: string, error: Error) {
    super('BadRequestError', 400, message, error);
  }
}
