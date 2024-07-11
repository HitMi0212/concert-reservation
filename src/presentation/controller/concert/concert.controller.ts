import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeatStatus } from '../../dto/concert/enum/consert.seat.status.enum';
import { ReservationRequestDto } from '../../dto/concert/request/concert.seat.reservation.request.dto';
import { ConcertResponseDto } from '../../dto/concert/response/concert.response.dto';
import { ReservationResponseDto } from '../../dto/concert/response/concert.seat.reservation.response.dto';
import { SeatResponseDto } from '../../dto/concert/response/concert.seat.response.dto';

@Controller('/concerts')
@ApiTags('콘서트 API')
export class ConcertController {
  constructor() {}

  @ApiOperation({
    summary: '예약 가능한 콘서트 목록 조회',
  })
  @ApiOkResponse({ type: ConcertResponseDto })
  @Get()
  async findAllConcert(): Promise<ConcertResponseDto[]> {
    return [
      new ConcertResponseDto({
        id: 1,
        name: '에스파 콘서트',
        seats: 50,
        concert_date: new Date('2024-07-13 18:00:00'),
        reservation_date: new Date('2024-07-05 20:00:00'),
      }),
      new ConcertResponseDto({
        id: 2,
        name: '뉴진스 콘서트',
        seats: 50,
        concert_date: new Date('2024-07-14 15:00:00'),
        reservation_date: new Date('2024-07-06 20:00:00'),
      }),
    ];
  }

  @ApiOperation({
    summary: '입력한 날짜에 예약 가능한 콘서트 목록 조회',
  })
  @ApiOkResponse({ type: ConcertResponseDto })
  @Get(':date')
  async findAllConcertByDate(
    @Param('date') date: string,
  ): Promise<ConcertResponseDto[]> {
    return [
      new ConcertResponseDto({
        id: 1,
        name: '에스파 콘서트',
        seats: 50,
        concert_date: new Date('2024-07-13 18:00:00'),
        reservation_date: new Date('2024-07-05 20:00:00'),
      }),
    ];
  }

  @ApiOperation({
    summary: '예약 가능한 콘서트 좌석 조회',
  })
  @ApiOkResponse({ type: ConcertResponseDto })
  @Get('/seats/:id')
  async findConcertSeat(
    @Param('id') concertId: number,
  ): Promise<SeatResponseDto[]> {
    return [
      new SeatResponseDto({
        id: 1,
        concertId: 1,
        seatNumber: 1,
        price: 50000,
        status: SeatStatus.AVAILABLE,
      }),
      new SeatResponseDto({
        id: 2,
        concertId: 1,
        seatNumber: 2,
        price: 50000,
        status: SeatStatus.AVAILABLE,
      }),
      new SeatResponseDto({
        id: 3,
        concertId: 1,
        seatNumber: 3,
        price: 50000,
        status: SeatStatus.AVAILABLE,
      }),
    ];
  }

  @ApiOperation({
    summary: '선택한 좌석 예약',
  })
  @ApiOkResponse({ type: ConcertResponseDto })
  @Post('/seats/reservation')
  async seatReservation(
    @Body()
    reservationInfo: ReservationRequestDto,
  ): Promise<ReservationResponseDto> {
    return new ReservationResponseDto({
      id: 1,
      concertId: 1,
      seatId: 1,
      userId: '12',
      createdAt: new Date('2024-07-07 18:00:00'),
      deletedAt: undefined,
    });
  }
}
