import { IsDecimal, IsString, IsUUID } from 'class-validator';

export class UserResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDecimal()
  balance: number;

  constructor(args: UserResponseProp) {
    Object.assign(this, args);
  }
}

type UserResponseProp = {
  id: string;
  name: string;
  balance: number;
};
