import { IsNumber, IsUUID } from 'class-validator';

export class TokenRequestDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  concertId: number;
}
