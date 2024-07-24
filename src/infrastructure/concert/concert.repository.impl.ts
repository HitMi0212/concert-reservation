import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConcertRepository } from 'src/domain/concert/concert.repository';
import { Concert } from 'src/domain/concert/model/concert';
import { Seat } from 'src/domain/concert/model/seat';
import {
  EntityManager,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ConcertDetailEntity, ConcertEntity } from './concert.entity';
import { SeatEntity } from './concert.seat.entity';
import { ReservationEntity } from './consert.seat.reservation.entity';
import { Reservation } from 'src/domain/concert/model/reservation';

@Injectable()
export class ConcertRepositoryImpl implements ConcertRepository {
  constructor(
    @InjectRepository(ConcertEntity)
    private readonly concertRepository: Repository<ConcertEntity>,
    @InjectRepository(ConcertDetailEntity)
    private readonly concertDetailRepository: Repository<ConcertDetailEntity>,
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async findAvailableConcert(date?: string): Promise<Concert[]> {
    const searchDate = date ? new Date(date) : new Date();

    const concerts: ConcertEntity[] =
      await this.concertRepository.manager.find(ConcertEntity);
    const details: ConcertDetailEntity[] =
      await this.concertDetailRepository.manager.find(ConcertDetailEntity, {
        where: {
          concertId: In(concerts.map((concert) => concert.id)),
          reservationDate: MoreThanOrEqual(new Date(searchDate)),
          concertDate: LessThanOrEqual(new Date(searchDate)),
        },
      });

    return concerts.map((concert) => {
      const concertDetails = details.filter(
        (detail) => detail.concertId === concert.id,
      );

      return Concert.mappingEntity(concert, concertDetails);
    });
  }

  async findConcertSeat(concertDetailId: number): Promise<Seat[]> {
    const seats: SeatEntity[] = await this.seatRepository.manager.findBy(
      SeatEntity,
      {
        concertDetailId: concertDetailId,
      },
    );

    return seats.map((seat) => {
      return Seat.mappingEntity(seat);
    });
  }

  async findConcertSeatById(seatId: number): Promise<Seat> {
    return Seat.mappingEntity(
      await this.seatRepository.manager.findOneBy(SeatEntity, {
        id: seatId,
      }),
    );
  }

  async seatReservation(
    seat: SeatEntity,
    reservation: ReservationEntity,
    _manager: EntityManager,
  ): Promise<Reservation> {
    const seatManager = _manager ?? this.seatRepository.manager;
    const reservationManager = _manager ?? this.reservationRepository.manager;

    await seatManager.save(SeatEntity, seat);

    const result: ReservationEntity = await reservationManager.save(
      ReservationEntity,
      reservation,
    );

    return Reservation.mappingEntity(result);
  }

  async saveSeat(seat: SeatEntity, _manager: EntityManager): Promise<Seat> {
    const manager = _manager ?? this.seatRepository.manager;

    return Seat.mappingEntity(await manager.save(seat));
  }

  async findReservation(
    userId: string,
    reservationId: number,
  ): Promise<Reservation> {
    return Reservation.mappingEntity(
      await this.reservationRepository.manager.findOneBy(ReservationEntity, {
        id: reservationId,
        userId: userId,
      }),
    );
  }

  async findConcertByDetailId(concertDetailId: number): Promise<Concert> {
    const detail: ConcertDetailEntity[] =
      await this.concertDetailRepository.manager.findBy(ConcertDetailEntity, {
        id: concertDetailId,
      });

    let concert: ConcertEntity | null = null;

    if (detail) {
      concert = await this.concertRepository.manager.findOneBy(ConcertEntity, {
        id: detail[0].concertId,
      });
    }

    return Concert.mappingEntity(concert, detail);
  }
}
