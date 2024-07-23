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

  @Column({ name: 'concert_id' })
  concertId: number;

  @Column()
  seats: number;

  @Column({ name: 'concert_date', type: 'datetime' })
  concertDate: Date;

  @Column({ name: 'reservation_date', type: 'datetime' })
  reservationDate: Date;
}
