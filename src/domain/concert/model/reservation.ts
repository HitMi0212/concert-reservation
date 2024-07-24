import { ReservationEntity } from 'src/infrastructure/concert/consert.seat.reservation.entity';

export class Reservation {
  id: number;
  concertDetailId: number;
  seatId: number;
  userId: string;
  createdAt: Date;
  deletedAt: Date;

  constructor(props?: {
    id?: number;
    concertDetailId?: number;
    seatId: number;
    userId: string;
    createdAt?: Date;
    deletedAt?: Date;
  }) {
    Object.assign(this, props);
  }

  static mappingEntity(reservation: ReservationEntity | null): Reservation {
    if (!reservation) {
      return new Reservation();
    }

    return new Reservation(reservation);
  }

  static toInfra(reservation: Reservation): ReservationEntity {
    return new ReservationEntity(reservation);
  }
}
