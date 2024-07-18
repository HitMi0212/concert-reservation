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

  @Column()
  concert_id: number;

  @Column()
  seat_number: number;

  @Column()
  price: number;

  @Column({
    enum: SeatStatus,
  })
  status: SeatStatus;
}
