import { SeatResponseDto } from '../../presentation/dto/concert/response/concert.seat.response.dto';
import { ConcertResponseDto } from '../../presentation/dto/concert/response/concert.response.dto';
import { ReservationResponseDto } from '../../presentation/dto/concert/response/concert.seat.reservation.response.dto';

export interface ConcertRepository {
  findAvailableConcert(): Promise<ConcertResponseDto[]>;

  findConcertByDate(date: string): Promise<ConcertResponseDto[]>;

  findConcertSeat(concertId: number): Promise<SeatResponseDto[]>;

  findConcertSeatById(concertId: number): Promise<SeatResponseDto>;

  seatReservation(seatId: number): Promise<ReservationResponseDto>;
}
