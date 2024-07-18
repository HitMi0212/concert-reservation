import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConcertResponseDto } from '../../presentation/dto/concert/response/concert.response.dto';
import { ReservationResponseDto } from '../../presentation/dto/concert/response/concert.seat.reservation.response.dto';
import { SeatResponseDto } from '../../presentation/dto/concert/response/concert.seat.response.dto';
import { ConcertRepository } from './concert.repository';
import { SeatStatus } from './entity/concert.seat.entity';

@Injectable()
export class ConcertService {
  constructor(private readonly concertRepository: ConcertRepository) {}

  async findAvailableConcert(): Promise<ConcertResponseDto[]> {
    const concerts: ConcertResponseDto[] =
      await this.concertRepository.findAvailableConcert();

    if (!concerts || !concerts.length) {
      throw new NotFoundException('현재 예약 가능한 콘서트가 없습니다.');
    }

    return concerts;
  }

  async findConcertByDate(date: string): Promise<ConcertResponseDto[]> {
    const concerts: ConcertResponseDto[] =
      await this.concertRepository.findConcertByDate(date);

    if (!concerts || !concerts.length) {
      throw new NotFoundException('해당 날짜에 예약가능한 콘서트가 없습니다.');
    }

    return concerts;
  }

  async findConcertSeat(concertId: number): Promise<SeatResponseDto[]> {
    const seats: SeatResponseDto[] =
      await this.concertRepository.findConcertSeat(concertId);

    if (!seats || !seats.length) {
      throw new NotFoundException('예약가능한 좌석이 없습니다.');
    }

    return seats;
  }

  async seatReservation(seatId: number): Promise<ReservationResponseDto> {
    const seat: SeatResponseDto =
      await this.concertRepository.findConcertSeatById(seatId);

    if (!seat) {
      throw new NotFoundException('예약가능한 좌석이 없습니다.');
    } else if (seat.status !== SeatStatus.AVAILABLE) {
      throw new ConflictException('이미 선택된 좌석입니다.');
    }

    const reservation: ReservationResponseDto =
      await this.concertRepository.seatReservation(seatId);

    return reservation;
  }
}
