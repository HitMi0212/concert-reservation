import { TokenStatusEnum } from '../../../presentation/dto/auth/enum/auth.enum';
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

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  concert_id: number;

  @Column()
  status: TokenStatusEnum;

  @CreateDateColumn({ type: 'datetime' })
  expiredAt: Date;

  constructor(props?: AuthEntityProp) {
    Object.assign(this, props);
  }
}

export type AuthEntityProp = {
  id: number;
  user_id: string;
  concert_id: number;
  status: TokenStatusEnum;
  expiredAt: Date;
};
