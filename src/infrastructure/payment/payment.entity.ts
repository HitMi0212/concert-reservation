import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'reservation_id' })
  reservationId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt: Date;

  constructor(props?: {
    id?: number;
    userId: string;
    reservationId: number;
    createdAt: Date;
    deletedAt?: Date;
  }) {
    Object.assign(this, props);
  }
}

@Entity('payment_detail')
export class PaymentDetailEntity {
  @PrimaryGeneratedColumn({ name: 'payment_id' })
  paymentId: number;

  @Column({ name: 'concert_id' })
  concertDetailId: number;

  @Column({ name: 'seat_id' })
  seatId: number;

  @Column({ name: 'concert_name' })
  concertName: string;

  @Column({ name: 'concert_date', type: 'datetime' })
  concertDate: Date;

  @Column({ name: 'seat_number' })
  seatNumber: number;

  @Column({ type: 'decimal' })
  price: number;

  constructor(props?: {
    paymentId: number;
    concertDetailId: number;
    seatId: number;
    concertName: string;
    concertDate: Date;
    seatNumber: number;
    price: number;
  }) {
    Object.assign(this, props);
  }
}
