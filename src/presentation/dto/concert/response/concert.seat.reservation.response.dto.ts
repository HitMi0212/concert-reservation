import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class ReservationResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  concertId: number;

  @IsNumber()
  seatId: number;

  @IsUUID()
  userId: string;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  deletedAt: Date;

  constructor(args: ReservationResponseProp) {
    Object.assign(this, args);
  }
}

type ReservationResponseProp = {
  id: number;
  concertId: number;
  seatId: number;
  userId: string;
  createdAt: Date;
  deletedAt?: Date;
};
