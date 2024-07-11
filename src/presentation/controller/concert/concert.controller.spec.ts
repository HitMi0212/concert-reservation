import { Test, TestingModule } from '@nestjs/testing';
import { SeatStatus } from '../../dto/concert/enum/consert.seat.status.enum';
import { ReservationRequestDto } from '../../dto/concert/request/concert.seat.reservation.request.dto';
import { ConcertResponseDto } from '../../dto/concert/response/concert.response.dto';
import { ReservationResponseDto } from '../../dto/concert/response/concert.seat.reservation.response.dto';
import { SeatResponseDto } from '../../dto/concert/response/concert.seat.response.dto';
import { ConcertController } from './concert.controller';

describe('ConcertController test', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [
        {
          provide: ConcertController,
          useValue: {
            findAllConcert: jest.fn().mockResolvedValue([
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
            ]),
            findConcertByDate: jest.fn().mockResolvedValue([
              new ConcertResponseDto({
                id: 1,
                name: '에스파 콘서트',
                seats: 50,
                concert_date: new Date('2024-07-13 18:00:00'),
                reservation_date: new Date('2024-07-05 20:00:00'),
              }),
            ]),
            findConcertSeat: jest.fn().mockResolvedValue([
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
            ]),
            seatReservation: jest.fn().mockResolvedValue(
              new ReservationResponseDto({
                id: 1,
                concertId: 1,
                seatId: 1,
                userId: '12',
                createdAt: new Date('2024-07-07 18:00:00'),
                deletedAt: undefined,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('콘서트 목록 조회', async () => {
    expect(await controller.findAllConcert()).toEqual([
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
    ]);
  });

  it('콘서트 조회', async () => {
    const date = '2024-07-08 18:00:00';

    expect(await controller.findAllConcertByDate(date)).toEqual([
      new ConcertResponseDto({
        id: 1,
        name: '에스파 콘서트',
        seats: 50,
        concert_date: new Date('2024-07-13 18:00:00'),
        reservation_date: new Date('2024-07-05 20:00:00'),
      }),
    ]);
  });

  it('콘서트 좌석 조회', async () => {
    expect(await controller.findConcertSeat(1)).toEqual([
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
    ]);
  });

  it('콘서트 좌석 임시 예약', async () => {
    expect(
      await controller.seatReservation(
        new ReservationRequestDto({
          userId: '12',
          concertId: 1,
          seatId: 1,
          tokenId: 2,
        }),
      ),
    ).toEqual(
      new ReservationResponseDto({
        id: 1,
        concertId: 1,
        seatId: 1,
        userId: '12',
        createdAt: new Date('2024-07-07 18:00:00'),
        deletedAt: undefined,
      }),
    );
  });
});
