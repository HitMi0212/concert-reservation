import { IsDecimal, IsEnum, IsNumber } from 'class-validator';
import { SeatStatus } from '../enum/consert.seat.status.enum';

export class SeatResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  concertId: number;

  @IsNumber()
  seatNumber: number;

  @IsDecimal()
  price: number;

  @IsEnum(SeatStatus)
  status: SeatStatus;

  constructor(args: SeatResponseProp) {
    Object.assign(this, args);
  }
}

type SeatResponseProp = {
  id: number;
  concertId: number;
  seatNumber: number;
  price: number;
  status: SeatStatus;
};
