import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { TokenStatusEnum } from '../enum/auth.enum';

export class TokenResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNumber()
  concertId: number;

  @ApiProperty()
  @IsEnum(TokenStatusEnum)
  status: TokenStatusEnum;

  @ApiProperty()
  @IsDate()
  expiredAt: Date;

  constructor(args: TokenResponseProp) {
    Object.assign(this, args);
  }
}

type TokenResponseProp = {
  id: number;
  userId: string;
  concertId: number;
  status: TokenStatusEnum;
  expiredAt: Date;
};
