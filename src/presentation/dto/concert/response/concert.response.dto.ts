import { IsDate, IsNumber, IsString } from 'class-validator';

export class ConcertResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  seats: number;

  @IsDate()
  concert_date: Date;

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
