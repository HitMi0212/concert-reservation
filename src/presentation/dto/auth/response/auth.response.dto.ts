import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { TokenStatus } from 'src/infrastructure/auth/auth.entity';

export class TokenResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNumber()
  concertDetailId: number;

  @ApiProperty()
  @IsEnum(TokenStatus)
  status: TokenStatus;

  @ApiProperty()
  @IsDate()
  expiredAt: Date;

  constructor(args?: {
    id: number;
    userId: string;
    concertDetailId: number;
    status: TokenStatus;
    expiredAt: Date;
  }) {
    Object.assign(this, args);
  }
}
