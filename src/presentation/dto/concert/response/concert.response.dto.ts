import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ConcertResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  seats: number;

  @ApiProperty()
  @IsDate()
  concert_date: Date;

  @ApiProperty()
  @IsDate()
  reservation_date: Date;

  constructor(args: ConcertResponseProp) {
    Object.assign(this, args);
  }
}

type ConcertResponseProp = {
  id: number;
  name: string;
  seats: number;
  concert_date: Date;
  reservation_date: Date;
};
