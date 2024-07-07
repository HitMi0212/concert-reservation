import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConcertResponse } from '../dto/response/concert.response';
import { SeatResponse } from '../dto/response/seat.response';
import { ReservationResponse } from '../dto/response/reservation.response';

@Controller('concerts')
export class ConcertController {
  @Get()
  async findAllConcert() {
    return [
      new ConcertResponse(1, '에스파 콘서트', 50, '2024-07-08 18:00:00'),
      new ConcertResponse(2, '뉴진스 콘서트', 50, '2024-07-09 15:00:00'),
    ];
  }

  @Get(':date')
  async findAllConcertByDate(@Param('date') date: string) {
    return [new ConcertResponse(1, '에스파 콘서트', 50, '2024-07-08 18:00:00')];
  }

  @Get('/seats/:id')
  async findConcertSeat(@Param('id') id: number) {
    return [
      new SeatResponse(1, 1, 50000, 'AVAILABLE'),
      new SeatResponse(1, 2, 50000, 'AVAILABLE'),
      new SeatResponse(1, 3, 50000, 'AVAILABLE'),
    ];
  }

  @Post('/seats/reservation')
  async seatReservation(
    @Body()
    reservationInfo: {
      userId: number;
      concertId: number;
      seatId: number;
      token: string;
    },
  ) {
    return new ReservationResponse(1, 1, 1, '2024-07-07 18:00:00');
  }
}
