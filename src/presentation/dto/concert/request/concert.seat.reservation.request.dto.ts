import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class ReservationRequestDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNumber()
  concertId: number;

  @ApiProperty()
  @IsNumber()
  seatId: number;

  @ApiProperty()
  @IsNumber()
  tokenId: number;

  constructor(args: ReservationRequestProp) {
    Object.assign(this, args);
  }
}

type ReservationRequestProp = {
  userId: string;
  concertId: number;
  seatId: number;
  tokenId: number;
};
