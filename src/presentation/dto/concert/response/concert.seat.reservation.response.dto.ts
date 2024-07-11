import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class ReservationResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  concertId: number;

  @ApiProperty()
  @IsNumber()
  seatId: number;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
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
