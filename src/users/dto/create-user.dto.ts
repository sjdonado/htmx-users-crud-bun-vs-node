import { IsNotEmpty, IsString, Matches, Validate } from 'class-validator';

import { EmailWhiteListValidator } from '../validators/email-whitelist.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Validate(EmailWhiteListValidator)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~=-]+$/)
  hash: string;
}
