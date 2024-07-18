import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString, IsUUID } from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
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
