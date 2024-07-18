import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('queue')
export class AuthEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'concert_detail_id' })
  concertDetailId: number;

  @Column()
  positon: number;

  @Column()
  status: TokenStatus;

  @CreateDateColumn({
    name: 'expired_at',
    type: 'datetime',
  })
  expiredAt: Date;

  constructor(props?: AuthEntityProp) {
    Object.assign(this, props);
  }

  active(): void {
    this.extension();
    this.status = TokenStatus.ACTIVATE;
  }

  extension(): void {
    // 만료시간 현재 시간에서 5분 후로 설정
    this.expiredAt = new Date(Date.now() + 5 * 60 * 1000);
  }

  expire(): void {
    this.status = TokenStatus.EXPIRED;
  }
}

export type AuthEntityProp = {
  id?: number;
  userId: string;
  concertDetailId: number;
  positon?: number;
  status: TokenStatus;
  expiredAt?: Date;
};

export enum TokenStatus {
  WAIT = 'WAIT',
  ACTIVATE = 'ACTIVATE',
  EXPIRED = 'EXPIRED',
}
