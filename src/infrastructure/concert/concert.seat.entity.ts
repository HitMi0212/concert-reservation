import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  COMPLETED = 'COMPLETED',
}

@Entity('seat')
export class SeatEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'concert_id' })
  concertDetailId: number;

  @Column({ name: 'seat_number' })
  seatNumber: number;

  @Column()
  price: number;

  @Column({
    enum: SeatStatus,
  })
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
}
