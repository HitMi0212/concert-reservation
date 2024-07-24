import { EntityManager } from 'typeorm';
import { Concert } from './model/concert';
import { Seat } from './model/seat';
import { SeatEntity } from 'src/infrastructure/concert/concert.seat.entity';
import { Reservation } from './model/reservation';
import { ReservationEntity } from 'src/infrastructure/concert/consert.seat.reservation.entity';

export interface ConcertRepository {
  findAvailableConcert(date?: string): Promise<Concert[]>;

  findConcertSeat(concertDetailId: number): Promise<Seat[]>;

  findConcertSeatById(seatId: number): Promise<Seat>;

  seatReservation(
    seat: SeatEntity,
    reservation: ReservationEntity,
    _manager: EntityManager,
  ): Promise<Reservation>;

  saveSeat(seat: SeatEntity, _manager: EntityManager): Promise<Seat>;

  findReservation(userId: string, reservationId: number): Promise<Reservation>;

  findConcertByDetailId(concertDetailId: number): Promise<Concert>;
}
