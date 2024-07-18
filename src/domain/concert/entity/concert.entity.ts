import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concert')
export class ConcertEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

@Entity('conert_detail')
export class ConcertDetailEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  concert_id: number;

  @Column()
  seats: number;

  @Column({ type: 'datetime' })
  concert_date: Date;

  @Column({ type: 'datetime' })
  reservation_date: Date;
}
