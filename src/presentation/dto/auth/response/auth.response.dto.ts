import { IsDate, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { TokenStatusEnum } from '../enum/auth.enum';

export class TokenResponseDto {
  @IsNumber()
  id: number;

  @IsUUID()
  userId: string;

  @IsNumber()
  concertId: number;

  @IsEnum(TokenStatusEnum)
  status: TokenStatusEnum;

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
