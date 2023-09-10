import { PartialType } from '@nestjs/mapped-types';

import { IsInt } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  counter: number;
}
