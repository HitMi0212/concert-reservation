import { IsDate, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { AuthEntity, TokenStatus } from 'src/infrastructure/auth/auth.entity';

export class TokenResponseDto {
  @IsNumber()
  id: number;

  @IsUUID()
  userId: string;

  @IsNumber()
  concertDetailId: number;

  @IsEnum(TokenStatus)
  status: TokenStatus;

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
