import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('seat_reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'concert_detail_id' })
  concertDetailId: number;

  @Column({ name: 'seat_id' })
  seatId: number;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

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
    concertDetailId?: number;
    seatId: number;
    userId: string;
    createdAt?: Date;
    deletedAt?: Date;
  }) {
    Object.assign(this, props);
  }
}
