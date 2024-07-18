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

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  reservation_id: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date;

  constructor(props?: PaymentEntityProp) {
    Object.assign(this, props);
  }
}

@Entity('payment_detail')
export class PaymentDetailEntity {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  concert_id: number;

  @Column()
  seat_id: number;

  @Column()
  concert_name: string;

  @Column({ type: 'datetime' })
  concert_date: Date;

  @Column()
  seat_number: number;

  @Column({ type: 'decimal' })
  price: number;
}

export type PaymentEntityProp = {
  id: number;
  user_id: string;
  reservation_id: number;
  created_at: Date;
  deleted_at?: Date;
};
