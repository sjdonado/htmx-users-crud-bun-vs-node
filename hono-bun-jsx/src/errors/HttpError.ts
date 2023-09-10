export class HttpError extends Error {
  readonly statusCode: number;
  readonly error: Error;

  constructor(name: string, statusCode: number, message: string, error: Error) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.error = error;
  }
}
