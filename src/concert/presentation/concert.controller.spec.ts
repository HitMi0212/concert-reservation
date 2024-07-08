import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertResponse } from '../dto/response/concert.response';
import { SeatResponse } from '../dto/response/seat.response';
import { ReservationResponse } from '../dto/response/reservation.response';

describe('ConcertController test', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [
        {
          provide: ConcertController,
          useValue: {
            findAllConcert: jest
              .fn()
              .mockResolvedValue([
                new ConcertResponse(
                  1,
                  '에스파 콘서트',
                  50,
                  '2024-07-08 18:00:00',
                ),
                new ConcertResponse(
                  2,
                  '뉴진스 콘서트',
                  50,
                  '2024-07-09 15:00:00',
                ),
              ]),
            findConcertByDate: jest
              .fn()
              .mockResolvedValue([
                new ConcertResponse(
                  1,
                  '에스파 콘서트',
                  50,
                  '2024-07-08 18:00:00',
                ),
              ]),
            findConcertSeat: jest
              .fn()
              .mockResolvedValue([
                new SeatResponse(1, 1, 50000, 'AVAILABLE'),
                new SeatResponse(1, 2, 50000, 'AVAILABLE'),
                new SeatResponse(1, 3, 50000, 'AVAILABLE'),
              ]),
          },
        },
      ],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('콘서트 목록 조회', async () => {
    expect(await controller.findAllConcert()).toEqual([
      new ConcertResponse(1, '에스파 콘서트', 50, '2024-07-08 18:00:00'),
      new ConcertResponse(2, '뉴진스 콘서트', 50, '2024-07-09 15:00:00'),
    ]);
  });

  it('콘서트 조회', async () => {
    const date = '2024-07-08 18:00:00';

    expect(await controller.findAllConcertByDate(date)).toEqual([
      new ConcertResponse(1, '에스파 콘서트', 50, '2024-07-08 18:00:00'),
    ]);
  });

  it('콘서트 좌석 조회', async () => {
    expect(await controller.findConcertSeat(1)).toEqual([
      new SeatResponse(1, 1, 50000, 'AVAILABLE'),
      new SeatResponse(1, 2, 50000, 'AVAILABLE'),
      new SeatResponse(1, 3, 50000, 'AVAILABLE'),
    ]);
  });

  it('콘서트 좌석 임시 예약', async () => {
    expect(
      await controller.seatReservation({
        userId: 12,
        concertId: 1,
        seatId: 1,
        token: 'test',
      }),
    ).toEqual(new ReservationResponse(1, 1, 1, '2024-07-07 18:00:00'));
  });
});
