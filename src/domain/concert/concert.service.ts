import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ConcertRepository } from './concert.repository';
import { Concert } from './model/concert';
import { Reservation } from './model/reservation';
import { Seat, SeatStatus } from './model/seat';

@Injectable()
export class ConcertService {
  constructor(private readonly concertRepository: ConcertRepository) {}

  async findAvailableConcert(): Promise<Concert[]> {
    const concerts: Concert[] =
      await this.concertRepository.findAvailableConcert();

    if (!concerts || !concerts.length) {
      throw new NotFoundException('현재 예약 가능한 콘서트가 없습니다.');
    }

    return concerts;
  }

  async findConcertByDate(date: string): Promise<Concert[]> {
    const concerts: Concert[] =
      await this.concertRepository.findAvailableConcert(date);

    if (!concerts || !concerts.length) {
      throw new NotFoundException('해당 날짜에 예약가능한 콘서트가 없습니다.');
    }

    return concerts;
  }

  async findConcertSeat(concertDetailId: number): Promise<Seat[]> {
    const seats: Seat[] =
      await this.concertRepository.findConcertSeat(concertDetailId);

    if (!seats || !seats.length) {
      throw new NotFoundException('예약가능한 좌석이 없습니다.');
    }

    return seats;
  }

  async seatReservation(
    seatId: number,
    userId: string,
    _manager: EntityManager,
  ): Promise<Reservation> {
    const seat: Seat = await this.concertRepository.findConcertSeatById(seatId);

    if (!seat) {
      throw new NotFoundException('예약가능한 좌석이 없습니다.');
    } else if (seat.status !== SeatStatus.AVAILABLE) {
      throw new ConflictException('이미 선택된 좌석입니다.');
    }

    seat.reservation();

    const newReservation = new Reservation({
      seatId,
      userId,
    });

    const reservation: Reservation =
      await this.concertRepository.seatReservation(
        Seat.toInfra(seat),
        Reservation.toInfra(newReservation),
        _manager,
      );

    return reservation;
  }

  async saveSeat(seat: Seat, _manager: EntityManager): Promise<Seat> {
    return await this.concertRepository.saveSeat(Seat.toInfra(seat), _manager);
  }

  async findReservation(
    userId: string,
    reservationId: number,
  ): Promise<Reservation> {
    return await this.concertRepository.findReservation(userId, reservationId);
  }

  async findConcertByDetailId(concertId: number): Promise<Concert> {
    return await this.concertRepository.findConcertByDetailId(concertId);
  }

  async findConcertSeatById(seatId: number): Promise<Seat> {
    return await this.concertRepository.findConcertSeatById(seatId);
  }
}
