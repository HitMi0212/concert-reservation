import { ConcertDetailEntity } from 'src/infrastructure/concert/concert.entity';
import { Seat, SeatStatus } from './seat';
import { SeatEntity } from 'src/infrastructure/concert/concert.seat.entity';

export class ConcertDetail {
  id: number;
  concertId: number;
  totalSeats: number;
  concertDate: Date;
  reservationDate: Date;
  seats: Seat[];

  constructor(props?: {
    id?: number;
    concertId: number;
    totalSeats?: number;
    concertDate?: Date;
    reservationDate?: Date;
    seats?: Seat[];
  }) {
    Object.assign(this, props);
  }

  static mappingEntity(
    detail: ConcertDetailEntity,
    seats?: SeatEntity[],
  ): ConcertDetail {
    if (!detail) {
      return new ConcertDetail();
    }

    return new ConcertDetail({
      id: detail.id,
      concertId: detail.concertId,
      totalSeats: seats?.length,
      concertDate: detail.concertDate,
      reservationDate: detail.reservationDate,
      seats: seats?.map((seat) => Seat.mappingEntity(seat)),
    });
  }

  findAvailableSeat(): void {
    this.seats = this.seats.filter((seat) => {
      return seat.status === SeatStatus.AVAILABLE;
    });
  }
}
