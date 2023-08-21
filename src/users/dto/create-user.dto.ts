import { IsNotEmpty, IsString, Validate } from 'class-validator';

import { EmailWhiteListValidator } from '../validators/email-whitelist.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Validate(EmailWhiteListValidator)
  email: string;

  @IsNotEmpty()
  @IsString()
  hash: string;
}
