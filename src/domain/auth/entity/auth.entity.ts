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
}

export type AuthEntityProp = {
  id: number;
  userId: string;
  status: TokenStatus;
  expiredAt: Date;
};

export enum TokenStatus {
  WAIT = 'WAIT',
  ACTIVATE = 'ACTIVATE',
  EXPIRED = 'EXPIRED',
}
