import { SeatEntity } from 'src/infrastructure/concert/concert.seat.entity';

export class Seat {
  id: number;
  concertDetailId: number;
  seatNumber: number;
  price: number;
  status: SeatStatus;

  constructor(props?: {
    id?: number;
    concertDetailId: number;
    seatNumber?: number;
    price?: number;
    status?: SeatStatus;
  }) {
    Object.assign(this, props);
  }

  static mappingEntity(seat: SeatEntity | null): Seat {
    if (!seat) {
      return new Seat();
    }

    return new Seat({
      id: seat.id,
      concertDetailId: seat.concertDetailId,
      seatNumber: seat.seatNumber,
      price: seat.price,
      status: seat.status,
    });
  }

  static toInfra(seat: Seat): SeatEntity {
    return new SeatEntity(seat);
  }

  reservation(): void {
    this.status = SeatStatus.RESERVED;
  }

  available(): void {
    this.status = SeatStatus.AVAILABLE;
  }

  complete(): void {
    this.status = SeatStatus.COMPLETED;
  }
}

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  COMPLETED = 'COMPLETED',
}
