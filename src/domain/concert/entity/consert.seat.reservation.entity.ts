import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('seat_reservation')
export class SeatEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  concert_id: number;

  @Column()
  seat_id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date;
}
