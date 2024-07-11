import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ConcertResponseDto } from '../../presentation/dto/concert/response/concert.response.dto';
import { SeatStatus } from './entity/concert.seat.entity';
import { ConcertController } from '../../presentation/controller/concert/concert.controller';

const concertEntities: ConcertResponseDto[] = [
  {
    id: 1,
    name: '에스파 콘서트',
    seats: 50,
    concert_date: new Date('2024-07-13 18:00:00'),
    reservation_date: new Date('2024-07-05 20:00:00'),
  },
  {
    id: 2,
    name: '뉴진스 콘서트',
    seats: 50,
    concert_date: new Date('2024-07-14 15:00:00'),
    reservation_date: new Date('2024-07-06 20:00:00'),
  },
];

describe('ConcertService', () => {
  let service: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [
        ConcertService,
        {
          provide: ConcertService,
          useValue: {
            findAvailableConcert: jest.fn().mockResolvedValue(concertEntities),
            findConcertByDate: jest
              .fn()
              .mockResolvedValue([concertEntities[0]]),
            findConcertSeat: jest.fn().mockResolvedValue([
              {
                id: 1,
                concertId: 1,
                seatNumber: 1,
                price: 50000,
                status: SeatStatus.AVAILABLE,
              },
              {
                id: 2,
                concertId: 1,
                seatNumber: 2,
                price: 50000,
                status: SeatStatus.AVAILABLE,
              },
            ]),
            seatReservation: jest.fn().mockResolvedValue({
              id: 1,
              concertId: 1,
              seatId: 1,
              userId: '12',
              createdAt: new Date('2024-07-07 18:00:00'),
              deletedAt: undefined,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
  });

  describe('콘서트 조회', () => {
    it('예약 가능한 콘서트 조회', async () => {
      const result = await service.findAvailableConcert();

      expect(result).toStrictEqual(concertEntities);
    });

    it('예약 가능한 콘서트가 없을 경우', async () => {
      jest
        .spyOn(service, 'findAvailableConcert')
        .mockRejectedValueOnce(
          new NotFoundException('현재 예약 가능한 콘서트가 없습니다.'),
        );

      await expect(service.findAvailableConcert()).rejects.toThrow(
        NotFoundException,
      );
    });

    it('입력한 날짜에 예약 가능한 콘서트 조회', async () => {
      // Given
      const date = '2024-07-13';

      // When
      const result = await service.findConcertByDate(date);

      // Then
      expect(result).toStrictEqual([concertEntities[0]]);
    });

    it('입력한 날짜에 예약 가능한 콘서트가 없을 경우', async () => {
      jest
        .spyOn(service, 'findConcertByDate')
        .mockRejectedValueOnce(
          new NotFoundException('현재 예약 가능한 콘서트가 없습니다.'),
        );

      const date = '2024-07-19';

      await expect(service.findConcertByDate(date)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('좌석 조회', () => {
    it('예약 가능한 좌석 조회', async () => {
      const concertId = 1;

      const result = await service.findConcertSeat(concertId);

      expect(result).toStrictEqual([
        {
          id: 1,
          concertId: 1,
          seatNumber: 1,
          price: 50000,
          status: SeatStatus.AVAILABLE,
        },
        {
          id: 2,
          concertId: 1,
          seatNumber: 2,
          price: 50000,
          status: SeatStatus.AVAILABLE,
        },
      ]);
    });

    it('예약 가능한 좌석이 없을 경우', async () => {
      jest
        .spyOn(service, 'findConcertSeat')
        .mockRejectedValueOnce(
          new NotFoundException('예약가능한 좌석이 없습니다.'),
        );

      const concertId = 1;

      await expect(service.findConcertSeat(concertId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('좌석 예약', () => {
    it('선택한 좌석 예약', async () => {
      const seatId = 1;

      const result = await service.seatReservation(seatId);

      expect(result).toEqual({
        id: 1,
        concertId: 1,
        seatId: 1,
        userId: '12',
        createdAt: new Date('2024-07-07 18:00:00'),
        deletedAt: undefined,
      });
    });

    it('예약 가능한 좌석이 없을 경우', async () => {
      jest
        .spyOn(service, 'seatReservation')
        .mockRejectedValueOnce(
          new NotFoundException('예약가능한 좌석이 없습니다.'),
        );

      const seatId = 1;

      await expect(service.seatReservation(seatId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('이미 선택된 좌석인 경우', async () => {
      jest
        .spyOn(service, 'seatReservation')
        .mockRejectedValueOnce(
          new ConflictException('이미 선택된 좌석입니다.'),
        );

      const seatId = 2;

      await expect(service.seatReservation(seatId)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
