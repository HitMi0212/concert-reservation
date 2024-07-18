import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsNumber } from 'class-validator';
import { SeatStatus } from '../enum/consert.seat.status.enum';

export class SeatResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  concertId: number;

  @ApiProperty()
  @IsNumber()
  seatNumber: number;

  @ApiProperty()
  @IsDecimal()
  price: number;

  @ApiProperty()
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
