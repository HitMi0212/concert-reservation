import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString, IsUUID } from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsDecimal()
  balance: number;

  constructor(args: { id: string; userName: string; balance: number }) {
    Object.assign(this, args);
  }
}
