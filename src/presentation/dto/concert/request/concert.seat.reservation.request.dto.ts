import { IsNumber, IsUUID } from 'class-validator';

export class ReservationRequestDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  concertId: number;

  @IsNumber()
  seatId: number;

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
